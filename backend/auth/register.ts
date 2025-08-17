import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import crypto from "crypto";

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

// Helper function to sanitize and normalize email
function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }
  
  // Remove all types of whitespace and invisible characters
  const cleaned = email
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
    .replace(/\s+/g, '') // Remove all whitespace
    .toLowerCase();
  
  return cleaned;
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

// Helper function to sanitize name
function sanitizeName(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }
  
  // Remove invisible characters but preserve normal spaces
  return name
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
    .replace(/\s+/g, ' '); // Normalize multiple spaces to single space
}

// Helper function to validate password strength
function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: "Password is required" };
  }

  // Only trim leading/trailing whitespace
  const trimmedPassword = password.trim();

  if (trimmedPassword.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }

  if (trimmedPassword.length > 128) {
    return { isValid: false, message: "Password must be less than 128 characters long" };
  }

  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(trimmedPassword);
  const hasNumber = /[0-9]/.test(trimmedPassword);

  if (!hasLetter || !hasNumber) {
    return { isValid: false, message: "Password must contain at least one letter and one number" };
  }

  return { isValid: true };
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

    // Validate password
    const passwordValidation = validatePassword(req.password);
    if (!passwordValidation.isValid) {
      console.log("Invalid password:", passwordValidation.message);
      throw APIError.invalidArgument(passwordValidation.message!);
    }

    const sanitizedPassword = req.password.trim();

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
      throw APIError.internal("Registration service temporarily unavailable. Please try again.");
    }

    if (existingUser) {
      console.log("User already exists with email:", sanitizedEmail);
      throw APIError.alreadyExists("An account with this email already exists");
    }

    // Hash password with enhanced error handling
    let passwordHash;
    try {
      console.log("Hashing password");
      const saltRounds = 12;
      passwordHash = await bcrypt.hash(sanitizedPassword, saltRounds);
      console.log("Password hashed successfully");
    } catch (hashError) {
      console.error("Password hashing error:", hashError);
      throw APIError.internal("Registration service error. Please try again.");
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    console.log("Generated verification token");

    let newUser;
    try {
      console.log("Creating new user in database");
      
      // Create user with transaction-like behavior
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
      // Don't fail registration if verification update fails
      console.log("Registration completed but email verification failed");
    }

    console.log("Registration completed successfully for user:", newUser.id);

    return {
      success: true,
      message: "Account created successfully! You can now log in.",
      userId: newUser.id,
    };
  }
);
