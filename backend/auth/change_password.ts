import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";

const coursesDB = SQLDatabase.named("courses");

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
}

// Changes the current user's password.
export const changePassword = api<ChangePasswordRequest, ChangePasswordResponse>(
  { auth: true, expose: true, method: "PUT", path: "/auth/password" },
  async (req) => {
    const auth = getAuthData()!;
    const userId = parseInt(auth.userID);

    if (!req.currentPassword || !req.newPassword) {
      throw APIError.invalidArgument("current password and new password are required");
    }

    if (req.newPassword.length < 6) {
      throw APIError.invalidArgument("new password must be at least 6 characters");
    }

    // Get current user with password hash
    const user = await coursesDB.queryRow<{
      id: number;
      password_hash: string;
    }>`SELECT id, password_hash FROM users WHERE id = ${userId}`;

    if (!user) {
      throw APIError.notFound("user not found");
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(req.currentPassword, user.password_hash);
    if (!isValidPassword) {
      throw APIError.unauthenticated("current password is incorrect");
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(req.newPassword, 10);

    // Update password
    await coursesDB.exec`
      UPDATE users 
      SET password_hash = ${newPasswordHash}, updated_at = NOW()
      WHERE id = ${userId}
    `;

    return {
      success: true,
    };
  }
);
