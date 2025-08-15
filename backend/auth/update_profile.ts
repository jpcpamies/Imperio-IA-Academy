import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface UpdateProfileRequest {
  name: string;
}

export interface UpdateProfileResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

// Updates the current user's profile information.
export const updateProfile = api<UpdateProfileRequest, UpdateProfileResponse>(
  { auth: true, expose: true, method: "PUT", path: "/auth/profile" },
  async (req) => {
    const auth = getAuthData()!;
    const userId = parseInt(auth.userID);

    if (!req.name || req.name.trim().length === 0) {
      throw APIError.invalidArgument("name is required");
    }

    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      name: string;
      role: string;
    }>`
      UPDATE users 
      SET name = ${req.name.trim()}, updated_at = NOW()
      WHERE id = ${userId}
      RETURNING id, email, name, role
    `;

    if (!user) {
      throw APIError.notFound("user not found");
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
);
