import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface MeRequest {
  session?: Cookie<"session">;
}

// Parse session token to extract user ID
function parseSessionToken(token: string): number | null {
  try {
    if (!token || !token.startsWith('session_')) {
      return null;
    }

    const parts = token.split('_');
    if (parts.length < 3) {
      return null;
    }

    const userId = parseInt(parts[1]);
    if (isNaN(userId) || userId <= 0) {
      return null;
    }

    return userId;
  } catch (error) {
    console.error("Session token parsing error:", error);
    return null;
  }
}

export const me = api<MeRequest, UserInfo>(
  { expose: true, method: "GET", path: "/auth/me" },
  async (req) => {
    try {
      const sessionToken = req.session?.value;
      
      if (!sessionToken) {
        throw APIError.unauthenticated("no session provided");
      }

      // Parse user ID from session token
      const userId = parseSessionToken(sessionToken);
      if (!userId) {
        throw APIError.unauthenticated("invalid session format");
      }

      // Find user by ID
      let user;
      try {
        user = await coursesDB.queryRow<{
          id: number;
          email: string;
          name: string;
          role: string;
        }>`SELECT id, email, name, role FROM users WHERE id = ${userId}`;
      } catch (dbError) {
        console.error("Database error during user lookup:", dbError);
        throw APIError.internal("user service temporarily unavailable");
      }

      if (!user) {
        throw APIError.unauthenticated("user not found");
      }

      return {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      };

    } catch (error) {
      // Re-throw APIError instances
      if (error instanceof APIError) {
        throw error;
      }
      
      // Log unexpected errors
      console.error("Unexpected user lookup error:", error);
      
      // Return generic error
      throw APIError.internal("user authentication failed");
    }
  }
);
