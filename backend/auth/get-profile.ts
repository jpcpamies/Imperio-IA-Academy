import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import { Header } from "encore.dev/api";

export interface GetProfileParams {
  authorization: Header<"Authorization">;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  emailVerified: boolean;
  createdAt: Date;
}

export interface GetProfileResponse {
  user: User;
}

// Gets the current user's profile information.
export const getProfile = api<GetProfileParams, GetProfileResponse>(
  { expose: true, method: "GET", path: "/auth/profile" },
  async (params) => {
    const token = params.authorization?.replace("Bearer ", "");
    if (!token) {
      throw APIError.unauthenticated("Authorization token required");
    }

    // Verify token and get user ID
    const verifyResponse = await verifyToken({ token });
    if (!verifyResponse.valid || !verifyResponse.user) {
      throw APIError.unauthenticated("Invalid or expired token");
    }

    // Get full user profile
    const user = await authDB.queryRow<{
      id: string;
      email: string;
      name: string;
      avatar_url: string | null;
      role: string;
      email_verified: boolean;
      created_at: Date;
    }>`
      SELECT id, email, name, avatar_url, role, email_verified, created_at
      FROM users 
      WHERE id = ${verifyResponse.user.id}
    `;

    if (!user) {
      throw APIError.notFound("User not found");
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatar_url,
        role: user.role,
        emailVerified: user.email_verified,
        createdAt: user.created_at,
      },
    };
  }
);

// Import verifyToken function
import { verifyToken } from "./verify-token";
