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

export const me = api<MeRequest, UserInfo>(
  { expose: true, method: "GET", path: "/auth/me" },
  async (req) => {
    const sessionToken = req.session?.value;
    
    if (!sessionToken || !sessionToken.startsWith('session_')) {
      throw APIError.unauthenticated("no valid session");
    }

    // Extract user ID from session token
    const parts = sessionToken.split('_');
    if (parts.length < 3) {
      throw APIError.unauthenticated("invalid session format");
    }

    const userId = parseInt(parts[1]);
    if (isNaN(userId)) {
      throw APIError.unauthenticated("invalid user id in session");
    }

    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      name: string;
      role: string;
    }>`SELECT id, email, name, role FROM users WHERE id = ${userId}`;

    if (!user) {
      throw APIError.unauthenticated("user not found");
    }

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
);
