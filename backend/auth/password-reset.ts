import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sanitizeEmail, sanitizePassword, isValidEmail, validatePassword } from "./utils";
import { checkMultiLayerRateLimit } from "./enhanced-rate-limiter";
import { logSecurityEvent } from "./security-logger";
import { sendPasswordResetEmail } from "./email-service";
import { BCRYPT_ROUNDS } from "./config";

export interface RequestPasswordResetRequest {
  email: string;
}

export interface RequestPasswordResetResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// Request password reset (sends reset token via email)
export const requestPasswordReset = api<RequestPasswordResetRequest, RequestPasswordResetResponse>(
  { expose: true, method: "POST", path: "/auth/request-password-reset" },
  async (req) => {
    console.log("Password reset request started");

    const sanitizedEmail = sanitizeEmail(req.email);
    const ipAddress = "unknown"; // In production, extract from request headers

    if (!isValidEmail(sanitizedEmail)) {
      throw APIError.invalidArgument("Please provide a valid email address");
    }

    // Check multi-layer rate limiting
    try {
      await checkMultiLayerRateLimit(sanitizedEmail, ipAddress, "password-reset", false);
    } catch (rateLimitError) {
      await logSecurityEvent({
        event: "RATE_LIMIT_EXCEEDED",
        email: sanitizedEmail,
        ipAddress: ipAddress,
        details: { action: "password_reset_request" }
      });
      throw rateLimitError;
    }

    try {
      // Check if user exists
      const user = await authDB.queryRow<{ 
        id: string; 
        email: string; 
        name: string;
      }>`
        SELECT id, email, name FROM users WHERE LOWER(email) = ${sanitizedEmail}
      `;

      if (user) {
        // Generate cryptographically secure reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Store reset token in database
        await authDB.exec`
          UPDATE users 
          SET reset_token = ${resetToken}, reset_token_expires = ${resetTokenExpires}
          WHERE id = ${user.id}
        `;

        // Send password reset email
        const emailSent = await sendPasswordResetEmail(user.email, resetToken);

        // Log security event
        await logSecurityEvent({
          event: "PASSWORD_RESET_REQUESTED",
          email: sanitizedEmail,
          userId: user.id,
          ipAddress: ipAddress,
          details: { 
            resetTokenExpires: resetTokenExpires.toISOString(),
            emailSent,
            userName: user.name
          }
        });

        console.log(`Password reset token generated for user ${user.id}, email sent: ${emailSent}`);
        
        if (!emailSent) {
          console.warn("Failed to send password reset email, but continuing for security");
        }
      } else {
        // Log security event for non-existent user (potential reconnaissance)
        await logSecurityEvent({
          event: "PASSWORD_RESET_REQUESTED_NONEXISTENT",
          email: sanitizedEmail,
          ipAddress: ipAddress,
          details: { reason: "User not found" }
        });
      }

      // Always return success to prevent email enumeration
      return {
        success: true,
        message: "If an account with that email exists, a password reset link has been sent. Please check your email and spam folder."
      };

    } catch (error) {
      console.error("Password reset request error:", error);
      
      await logSecurityEvent({
        event: "PASSWORD_RESET_ERROR",
        email: sanitizedEmail,
        ipAddress: ipAddress,
        details: { error: error instanceof Error ? error.message : "Unknown error" }
      });

      throw APIError.internal("Password reset service temporarily unavailable. Please try again later.");
    }
  }
);

// Reset password with token
export const resetPassword = api<ResetPasswordRequest, ResetPasswordResponse>(
  { expose: true, method: "POST", path: "/auth/reset-password" },
  async (req) => {
    console.log("Password reset attempt started");

    if (!req.token || !req.newPassword) {
      throw APIError.invalidArgument("Reset token and new password are required");
    }

    // Validate new password
    const passwordValidation = validatePassword(req.newPassword);
    if (!passwordValidation.isValid) {
      throw APIError.invalidArgument(passwordValidation.message!);
    }

    const sanitizedPassword = sanitizePassword(req.newPassword);
    const ipAddress = "unknown"; // In production, extract from request headers

    try {
      // Find user with valid reset token
      const user = await authDB.queryRow<{
        id: string;
        email: string;
        name: string;
        reset_token_expires: Date;
      }>`
        SELECT id, email, name, reset_token_expires
        FROM users 
        WHERE reset_token = ${req.token} 
        AND reset_token_expires > NOW()
      `;

      if (!user) {
        // Log security event for invalid/expired token
        await logSecurityEvent({
          event: "PASSWORD_RESET_INVALID_TOKEN",
          ipAddress: ipAddress,
          details: { 
            token: req.token.substring(0, 8) + "...",
            reason: "Token not found or expired"
          }
        });

        throw APIError.unauthenticated("Invalid or expired reset token. Please request a new password reset.");
      }

      // Hash new password with production-grade settings
      const passwordHash = await bcrypt.hash(sanitizedPassword, BCRYPT_ROUNDS);

      // Update password and clear reset token in a transaction
      await authDB.exec`
        UPDATE users 
        SET password_hash = ${passwordHash}, 
            reset_token = NULL, 
            reset_token_expires = NULL,
            updated_at = NOW()
        WHERE id = ${user.id}
      `;

      // Log successful password reset
      await logSecurityEvent({
        event: "PASSWORD_RESET_SUCCESS",
        email: user.email,
        userId: user.id,
        ipAddress: ipAddress,
        details: { 
          resetTokenExpired: user.reset_token_expires.toISOString(),
          userName: user.name
        }
      });

      console.log(`Password reset successful for user ${user.id}`);

      return {
        success: true,
        message: "Password has been reset successfully. You can now log in with your new password."
      };

    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      console.error("Password reset error:", error);
      
      await logSecurityEvent({
        event: "PASSWORD_RESET_ERROR",
        ipAddress: ipAddress,
        details: { 
          error: error instanceof Error ? error.message : "Unknown error",
          token: req.token.substring(0, 8) + "..."
        }
      });

      throw APIError.internal("Password reset failed. Please try again or request a new reset link.");
    }
  }
);

// Validate reset token (for frontend to check if token is valid before showing form)
export const validateResetToken = api<{ token: string }, { valid: boolean; expired: boolean }>(
  { expose: true, method: "POST", path: "/auth/validate-reset-token" },
  async (req) => {
    if (!req.token) {
      return { valid: false, expired: false };
    }

    try {
      const user = await authDB.queryRow<{
        id: string;
        reset_token_expires: Date;
      }>`
        SELECT id, reset_token_expires
        FROM users 
        WHERE reset_token = ${req.token}
      `;

      if (!user) {
        return { valid: false, expired: false };
      }

      const isExpired = new Date() > user.reset_token_expires;
      
      if (isExpired) {
        // Clean up expired token
        await authDB.exec`
          UPDATE users 
          SET reset_token = NULL, reset_token_expires = NULL
          WHERE id = ${user.id}
        `;
      }

      return { 
        valid: !isExpired, 
        expired: isExpired 
      };

    } catch (error) {
      console.error("Token validation error:", error);
      return { valid: false, expired: false };
    }
  }
);
