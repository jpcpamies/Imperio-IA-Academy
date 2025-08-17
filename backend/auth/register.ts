import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sanitizeEmail, sanitizeName, sanitizePassword, isValidEmail, validatePassword } from "./utils";
import { checkRateLimit, registerRateLimiter } from "./rate-limiter";
import { logSecurityEvent } from "./security-logger";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: string;
}

// Registers a new user account.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    console.log("Registration attempt started");

    // Input validation and sanitization
    const sanitizedName = sanitizeName(req.name);
    const sanitizedEmail = sanitizeEmail(req.email);
    
    console.log("Sanitized name:", sanitizedName);
    console.log("Sanitized email:", sanitizedEmail);

    // Validate name
    if (!sanitizedName || sanitizedName.length < 2) {
      console.log("Invalid name:", sanitizedName);
      throw APIError.invalidArgument("Name must be at least 2 characters long");
    }

    if (sanitizedName.length > 100) {
      console.log("Name too long:", sanitizedName.length);
      throw APIError.invalidArgument("Name must be less than 100 characters long");
    }

    // Validate email
    if (!isValidEmail(sanitizedEmail)) {
      console.log("Invalid email format:", sanitizedEmail);
      throw APIError.invalidArgument("Please provide a valid email address");
    }

    // Check rate limiting
    try {
      checkRateLimit(registerRateLimiter, sanitizedEmail, "registration");
    } catch (rateLimitError) {
      // Log security event for rate limit exceeded
      await logSecurityEvent({
        event: "RATE_LIMIT_EXCEEDED",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { action: "registration" }
      });
      throw rateLimitError;
    }

    // Validate password using centralized function
    const passwordValidation = validatePassword(req.password);
    if (!passwordValidation.isValid) {
      console.log("Invalid password:", passwordValidation.message);
      
      // Log security event for weak password attempt
      await logSecurityEvent({
        event: "WEAK_PASSWORD_ATTEMPT",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { reason: passwordValidation.message }
      });
      
      throw APIError.invalidArgument(passwordValidation.message!);
    }

    const sanitizedPassword = sanitizePassword(req.password);
    console.log("Password sanitized for hashing, length:", sanitizedPassword.length);

    // Check if user already exists with case-insensitive email lookup
    let existingUser;
    try {
      console.log("Checking for existing user with email:", sanitizedEmail);
      
      existingUser = await authDB.queryRow<{ id: string }>`
        SELECT id FROM users WHERE LOWER(email) = ${sanitizedEmail}
      `;
      
      console.log("Existing user check completed, found:", !!existingUser);
    } catch (dbError) {
      console.error("Database error during existing user check:", dbError);
      
      // Log security event for database error
      await logSecurityEvent({
        event: "DATABASE_ERROR",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { error: "Database connection failed during registration" }
      });
      
      throw APIError.internal("Registration service temporarily unavailable. Please try again.");
    }

    if (existingUser) {
      console.log("User already exists with email:", sanitizedEmail);
      
      // Log security event for duplicate registration attempt
      await logSecurityEvent({
        event: "DUPLICATE_REGISTRATION_ATTEMPT",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { existingUserId: existingUser.id }
      });
      
      throw APIError.alreadyExists("An account with this email already exists");
    }

    // Hash password
    let passwordHash;
    try {
      console.log("Hashing password with bcrypt");
      const saltRounds = 12;
      passwordHash = await bcrypt.hash(sanitizedPassword, saltRounds);
      console.log("Password hashed successfully");
    } catch (hashError) {
      console.error("Password hashing error:", hashError);
      
      // Log security event for hashing error
      await logSecurityEvent({
        event: "PASSWORD_HASHING_ERROR",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { error: "bcrypt hashing failed" }
      });
      
      throw APIError.internal("Registration service error. Please try again.");
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    console.log("Generated verification token");

    let newUser;
    try {
      console.log("Creating new user in database");
      
      // Create user
      newUser = await authDB.queryRow<{ id: string }>`
        INSERT INTO users (name, email, password_hash, verification_token)
        VALUES (${sanitizedName}, ${sanitizedEmail}, ${passwordHash}, ${verificationToken})
        RETURNING id
      `;

      if (!newUser) {
        throw new Error("Failed to create user record");
      }

      console.log("User created successfully with ID:", newUser.id);
    } catch (createError) {
      console.error("User creation error:", createError);
      
      // Log security event for user creation error
      await logSecurityEvent({
        event: "USER_CREATION_ERROR",
        email: sanitizedEmail,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { error: createError instanceof Error ? createError.message : "Unknown error" }
      });
      
      // Check if it's a unique constraint violation
      if (createError instanceof Error && createError.message.includes('unique')) {
        throw APIError.alreadyExists("An account with this email already exists");
      }
      
      throw APIError.internal("Failed to create account. Please try again.");
    }

    // Auto-verify the user for now (in production, send verification email)
    try {
      console.log("Auto-verifying user email");
      
      await authDB.exec`
        UPDATE users SET email_verified = true, verification_token = null
        WHERE id = ${newUser.id}
      `;
      
      console.log("User email verified successfully");
    } catch (verifyError) {
      console.error("Email verification error:", verifyError);
      
      // Log security event for verification error
      await logSecurityEvent({
        event: "EMAIL_VERIFICATION_ERROR",
        email: sanitizedEmail,
        userId: newUser.id,
        ipAddress: "unknown",
        userAgent: "unknown",
        details: { error: "Auto-verification failed" }
      });
      
      // Don't fail registration if verification update fails
      console.log("Registration completed but email verification failed");
    }

    // Log successful registration
    await logSecurityEvent({
      event: "REGISTRATION_SUCCESS",
      email: sanitizedEmail,
      userId: newUser.id,
      ipAddress: "unknown",
      userAgent: "unknown",
      details: { name: sanitizedName }
    });

    console.log("Registration completed successfully for user:", newUser.id);

    return {
      success: true,
      message: "Account created successfully! You can now log in.",
      userId: newUser.id,
    };
  }
);
