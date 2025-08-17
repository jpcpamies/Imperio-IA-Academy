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

// Registers a new user account.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    // Validate input
    if (!req.name || req.name.trim().length < 2) {
      throw APIError.invalidArgument("Name must be at least 2 characters long");
    }

    if (!req.email || !isValidEmail(req.email)) {
      throw APIError.invalidArgument("Please provide a valid email address");
    }

    if (!req.password || req.password.length < 8) {
      throw APIError.invalidArgument("Password must be at least 8 characters long");
    }

    const email = req.email.toLowerCase().trim();
    const name = req.name.trim();

    // Check if user already exists
    const existingUser = await authDB.queryRow<{ id: string }>`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("An account with this email already exists");
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(req.password, saltRounds);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    try {
      // Create user
      const user = await authDB.queryRow<{ id: string }>`
        INSERT INTO users (name, email, password_hash, verification_token)
        VALUES (${name}, ${email}, ${passwordHash}, ${verificationToken})
        RETURNING id
      `;

      if (!user) {
        throw APIError.internal("Failed to create user account");
      }

      // In a real app, you would send a verification email here
      // For now, we'll auto-verify the user
      await authDB.exec`
        UPDATE users SET email_verified = true, verification_token = null
        WHERE id = ${user.id}
      `;

      return {
        success: true,
        message: "Account created successfully! You can now log in.",
        userId: user.id,
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw APIError.internal("Failed to create account. Please try again.");
    }
  }
);

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
