import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const jwtSecret = secret("JWTSecret");

export interface VerifyTokenRequest {
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  emailVerified: boolean;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user?: User;
}

// Verifies a JWT token and returns user information.
export const verifyToken = api<VerifyTokenRequest, VerifyTokenResponse>(
  { expose: true, method: "POST", path: "/auth/verify-token" },
  async (req) => {
    if (!req.token) {
      return { valid: false };
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(req.token, jwtSecret()) as {
        userId: string;
        email: string;
        role: string;
      };

      // Get current user data from database
      const user = await authDB.queryRow<{
        id: string;
        email: string;
        name: string;
        avatar_url: string | null;
        role: string;
        email_verified: boolean;
      }>`
        SELECT id, email, name, avatar_url, role, email_verified
        FROM users 
        WHERE id = ${decoded.userId}
      `;

      if (!user) {
        return { valid: false };
      }

      return {
        valid: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatar_url,
          role: user.role,
          emailVerified: user.email_verified,
        },
      };
    } catch (error) {
      console.error("Token verification error:", error);
      return { valid: false };
    }
  }
);
