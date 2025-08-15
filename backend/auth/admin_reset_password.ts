import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

const coursesDB = SQLDatabase.named("courses");

export interface AdminResetPasswordRequest {
  userId: number;
}

export interface AdminResetPasswordResponse {
  success: boolean;
  temporaryPassword: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

// Admin function to reset user password.
export const adminResetPassword = api<AdminResetPasswordRequest, AdminResetPasswordResponse>(
  { auth: true, expose: true, method: "POST", path: "/auth/admin/reset-password" },
  async (req) => {
    const auth = getAuthData()!;
    
    // Check if user is admin
    if (auth.role !== 'admin') {
      throw APIError.permissionDenied("admin access required");
    }

    // Get user to reset
    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      name: string;
    }>`SELECT id, email, name FROM users WHERE id = ${req.userId}`;

    if (!user) {
      throw APIError.notFound("user not found");
    }

    // Generate temporary password
    const temporaryPassword = crypto.randomBytes(8).toString('hex');
    const passwordHash = await bcrypt.hash(temporaryPassword, 10);

    // Update user password
    await coursesDB.exec`
      UPDATE users 
      SET password_hash = ${passwordHash}, updated_at = NOW()
      WHERE id = ${user.id}
    `;

    console.log(`🔐 ADMIN PASSWORD RESET - Admin: ${auth.email}, Target User: ${user.email}, New Password: ${temporaryPassword}`);

    return {
      success: true,
      temporaryPassword,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
);
