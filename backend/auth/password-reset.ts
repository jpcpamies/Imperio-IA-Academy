import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sanitizeEmail, sanitizePassword, isValidEmail, validatePassword } from "./utils";
import { checkRateLimit, registerRateLimiter } from "./rate-limiter";
import { logSecurityEvent } from "./security-logger";

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

// Request password reset (sends reset token)
export const requestPasswordReset = api<RequestPasswordResetRequest, RequestPasswordResetResponse>(
  { expose: true, method: "POST", path: "/auth/request-password-reset" },
  async (req) => {
    console.log("Password reset request started");

    const sanitizedEmail = sanitizeEmail(req.email);

    if (!isValidEmail(sanitizedEmail)) {
      throw APIError.invalidArgument("Please provide a valid email address");
    }

    // Check rate limiting (reuse registration rate limiter)
    try {
      checkRateLimit(registerRateLimiter, sanitizedEmail, "password reset request");
    } catch (rateLimitError) {
      await logSecurityEvent({
        event: "RATE_LIMIT_EXCEEDED",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { action: "password_reset_request" }
      });
      throw rateLimitError;
    }

    try {
      // Check if user exists
      const user = await authDB.queryRow<{ id: string; email: string }>`
        SELECT id, email FROM users WHERE LOWER(email) = ${sanitizedEmail}
      `;

      if (user) {
        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Store reset token
        await authDB.exec`
          UPDATE users 
          SET reset_token = ${resetToken}, reset_token_expires = ${resetTokenExpires}
          WHERE id = ${user.id}
        `;

        // Log security event
        await logSecurityEvent({
          event: "PASSWORD_RESET_REQUESTED",
          email: sanitizedEmail,
          userId: user.id,
          ipAddress: "unknown",
          userAgent: "unknown",
          details: { resetTokenExpires: resetTokenExpires.toISOString() }
        });

        console.log(`Password reset token generated for user ${user.id}`);
        
        // TODO: Send email with reset link
        // In production, send email with link: /reset-password?token=${resetToken}
        console.log(`Reset token (for development): ${resetToken}`);
      } else {
        // Log security event for non-existent user
        await logSecurityEvent({
          event: "PASSWORD_RESET_REQUESTED_NONEXISTENT",
          email: sanitizedEmail,
          ipAddress: "unknown",
          userAgent: "unknown",
          details: { reason: "User not found" }
        });
      }

      // Always return success to prevent email enumeration
      return {
        success: true,
        message: "If an account with that email exists, a password reset link has been sent."
      };

    } catch (error) {
      console.error("Password reset request error:", error);
      
      await logSecurityEvent({
        event: "PASSWORD_RESET_ERROR",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { error: error instanceof Error ? error.message : "Unknown error" }
      });

      throw APIError.internal("Password reset service temporarily unavailable. Please try again.");
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

    try {
      // Find user with valid reset token
      const user = await authDB.queryRow<{
        id: string;
        email: string;
        reset_token_expires: Date;
      }>`
        SELECT id, email, reset_token_expires
        FROM users 
        WHERE reset_token = ${req.token} 
        AND reset_token_expires > NOW()
      `;

      if (!user) {
        // Log security event for invalid/expired token
        await logSecurityEvent({
          event: "PASSWORD_RESET_INVALID_TOKEN",
          ipAddress: "unknown",
          userAgent: "unknown",
          details: { token: req.token.substring(0, 8) + "..." }
        });

        throw APIError.unauthenticated("Invalid or expired reset token");
      }

      // Hash new password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(sanitizedPassword, saltRounds);

      // Update password and clear reset token
      await authDB.exec`
        UPDATE users 
        SET password_hash = ${passwordHash}, 
            reset_token = NULL, 
            reset_token_expires = NULL
        WHERE id = ${user.id}
      `;

      // Log security event for successful password reset
      await logSecurityEvent({
        event: "PASSWORD_RESET_SUCCESS",
        email: user.email,
        userId: user.id,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { resetTokenExpired: user.reset_token_expires.toISOString() }
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
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { 
          error: error instanceof Error ? error.message : "Unknown error",
          token: req.token.substring(0, 8) + "..."
        }
      });

      throw APIError.internal("Password reset failed. Please try again.");
    }
  }
);
