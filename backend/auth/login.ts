import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { jwtSecret, JWT_EXPIRATION, JWT_ISSUER, JWT_AUDIENCE } from "./config";
import { sanitizeEmail, sanitizePassword, isValidEmail } from "./utils";
import { checkMultiLayerRateLimit } from "./enhanced-rate-limiter";
import { logSecurityEvent } from "./security-logger";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  emailVerified: boolean;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
}

// Authenticates a user with email and password.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    console.log("Login attempt started");
    
    // Input validation and sanitization
    if (!req.email || !req.password) {
      console.log("Missing email or password");
      throw APIError.invalidArgument("Email and password are required");
    }

    const sanitizedEmail = sanitizeEmail(req.email);
    const sanitizedPassword = sanitizePassword(req.password);
    const ipAddress = "unknown"; // In production, extract from request headers

    console.log("Sanitized email:", sanitizedEmail);

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      console.log("Invalid email format:", sanitizedEmail);
      throw APIError.invalidArgument("Please provide a valid email address");
    }

    // Validate password length
    if (sanitizedPassword.length === 0) {
      console.log("Empty password after sanitization");
      throw APIError.invalidArgument("Password cannot be empty");
    }

    let user;
    let loginSuccess = false;

    try {
      // Check multi-layer rate limiting before attempting login
      await checkMultiLayerRateLimit(sanitizedEmail, ipAddress, "login", false);

      // Case-insensitive email lookup
      console.log("Querying database for user with email:", sanitizedEmail);
      
      user = await authDB.queryRow<{
        id: string;
        email: string;
        password_hash: string;
        name: string;
        avatar_url: string | null;
        role: string;
        email_verified: boolean;
      }>`
        SELECT id, email, password_hash, name, avatar_url, role, email_verified
        FROM users 
        WHERE LOWER(email) = ${sanitizedEmail}
      `;
      
      console.log("Database query completed, user found:", !!user);

      if (!user) {
        console.log("User not found for email:", sanitizedEmail);
        
        // Log security event for failed login attempt
        await logSecurityEvent({
          event: "LOGIN_FAILED",
          email: sanitizedEmail,
          ipAddress: ipAddress,
          details: { reason: "User not found" }
        });
        
        // Use generic message to prevent email enumeration
        throw APIError.unauthenticated("Invalid email or password");
      }

      console.log("User found, verifying password");

      // Verify password
      let isValidPassword = false;
      try {
        isValidPassword = await bcrypt.compare(sanitizedPassword, user.password_hash);
        console.log("Password verification completed, valid:", isValidPassword);
      } catch (bcryptError) {
        console.error("Password verification error:", bcryptError);
        
        // Log security event for bcrypt error
        await logSecurityEvent({
          event: "PASSWORD_VERIFICATION_ERROR",
          email: sanitizedEmail,
          userId: user.id,
          ipAddress: ipAddress,
          details: { error: "bcrypt verification failed" }
        });
        
        throw APIError.internal("Authentication service error. Please try again.");
      }

      if (!isValidPassword) {
        console.log("Invalid password for user:", user.id);
        
        // Log security event for invalid password
        await logSecurityEvent({
          event: "LOGIN_FAILED",
          email: sanitizedEmail,
          userId: user.id,
          ipAddress: ipAddress,
          details: { reason: "Invalid password" }
        });
        
        throw APIError.unauthenticated("Invalid email or password");
      }

      // Check if email is verified
      if (!user.email_verified) {
        console.log("Email not verified for user:", user.id);
        
        // Log security event for unverified email login attempt
        await logSecurityEvent({
          event: "LOGIN_FAILED",
          email: sanitizedEmail,
          userId: user.id,
          ipAddress: ipAddress,
          details: { reason: "Email not verified" }
        });
        
        throw APIError.permissionDenied("Please verify your email address before logging in. Check your email for a verification link.");
      }

      console.log("Authentication successful, generating token");
      loginSuccess = true;

      // Generate JWT token with enhanced security
      let token;
      try {
        token = jwt.sign(
          { 
            userId: user.id, 
            email: user.email, 
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            // Add additional claims for security
            sessionId: crypto.randomUUID(),
            loginTime: new Date().toISOString()
          },
          jwtSecret(),
          { 
            expiresIn: JWT_EXPIRATION,
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
            algorithm: 'HS256'
          }
        );
        console.log("Token generated successfully");
      } catch (jwtError) {
        console.error("JWT generation error:", jwtError);
        
        // Log security event for JWT generation error
        await logSecurityEvent({
          event: "TOKEN_GENERATION_ERROR",
          email: sanitizedEmail,
          userId: user.id,
          ipAddress: ipAddress,
          details: { error: "JWT generation failed" }
        });
        
        throw APIError.internal("Authentication token generation failed. Please try again.");
      }

      // Update last login timestamp
      try {
        await authDB.exec`
          UPDATE users 
          SET updated_at = NOW()
          WHERE id = ${user.id}
        `;
      } catch (updateError) {
        // Don't fail login if timestamp update fails
        console.warn("Failed to update last login timestamp:", updateError);
      }

      // Log successful login
      await logSecurityEvent({
        event: "LOGIN_SUCCESS",
        email: sanitizedEmail,
        userId: user.id,
        ipAddress: ipAddress,
        details: { 
          role: user.role,
          sessionId: token ? (jwt.decode(token) as any)?.sessionId : undefined
        }
      });

      // Check rate limiting for successful login (this will reset failure counters)
      await checkMultiLayerRateLimit(sanitizedEmail, ipAddress, "login", true);

      console.log("Login successful for user:", user.id);

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatar_url,
          role: user.role,
          emailVerified: user.email_verified,
        },
        token,
      };

    } catch (error) {
      // If this is already an APIError, just re-throw it
      if (error instanceof APIError) {
        throw error;
      }

      console.error("Unexpected login error:", error);
      
      // Log unexpected error
      await logSecurityEvent({
        event: "LOGIN_ERROR",
        email: sanitizedEmail,
        userId: user?.id,
        ipAddress: ipAddress,
        details: { 
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined
        }
      });
      
      throw APIError.internal("Authentication service temporarily unavailable. Please try again.");
    }
  }
);
