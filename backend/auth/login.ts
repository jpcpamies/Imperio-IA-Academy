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

// Authenticates a user with email and password.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    if (!req.email || !req.password) {
      throw APIError.invalidArgument("Email and password are required");
    }

    const email = req.email.toLowerCase().trim();

    // Find user by email
    const user = await authDB.queryRow<{
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
      WHERE email = ${email}
    `;

    if (!user) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(req.password, user.password_hash);
    if (!isValidPassword) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Check if email is verified
    if (!user.email_verified) {
      throw APIError.permissionDenied("Please verify your email address before logging in");
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      jwtSecret(),
      { expiresIn: '7d' }
    );

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
