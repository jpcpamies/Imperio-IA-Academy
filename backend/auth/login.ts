import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const jwtSecret = secret("JWTSecret");

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

// Helper function to sanitize password
function sanitizePassword(password: string): string {
  if (!password || typeof password !== 'string') {
    return '';
  }
  
  // Only trim leading/trailing whitespace, preserve internal spaces
  return password.trim();
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

    console.log("Sanitized email:", sanitizedEmail);
    console.log("Password length:", sanitizedPassword.length);

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
    try {
      // Case-insensitive email lookup with retry logic
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
    } catch (dbError) {
      console.error("Database error during user lookup:", dbError);
      throw APIError.internal("Authentication service temporarily unavailable. Please try again.");
    }

    if (!user) {
      console.log("User not found for email:", sanitizedEmail);
      // Use generic message to prevent email enumeration
      throw APIError.unauthenticated("Invalid email or password");
    }

    console.log("User found, verifying password");
    console.log("User email verified:", user.email_verified);

    // Verify password with enhanced error handling
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(sanitizedPassword, user.password_hash);
      console.log("Password verification completed, valid:", isValidPassword);
    } catch (bcryptError) {
      console.error("Password verification error:", bcryptError);
      throw APIError.internal("Authentication service error. Please try again.");
    }

    if (!isValidPassword) {
      console.log("Invalid password for user:", user.id);
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Check if email is verified
    if (!user.email_verified) {
      console.log("Email not verified for user:", user.id);
      throw APIError.permissionDenied("Please verify your email address before logging in");
    }

    console.log("Authentication successful, generating token");

    // Generate JWT token with enhanced error handling
    let token;
    try {
      token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role,
          iat: Math.floor(Date.now() / 1000)
        },
        jwtSecret(),
        { 
          expiresIn: '7d',
          issuer: 'ai-academia',
          audience: 'ai-academia-users'
        }
      );
      console.log("Token generated successfully");
    } catch (jwtError) {
      console.error("JWT generation error:", jwtError);
      throw APIError.internal("Authentication token generation failed. Please try again.");
    }

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
  }
);
