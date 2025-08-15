import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

const coursesDB = SQLDatabase.named("courses");

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  // For development mode - in production this would not be returned
  temporaryPassword?: string;
}

// Initiates password reset process for a user.
export const resetPassword = api<ResetPasswordRequest, ResetPasswordResponse>(
  { expose: true, method: "POST", path: "/auth/reset-password" },
  async (req) => {
    if (!req.email) {
      throw APIError.invalidArgument("email is required");
    }

    // Check if user exists
    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      name: string;
    }>`SELECT id, email, name FROM users WHERE email = ${req.email}`;

    if (!user) {
      // For security, we don't reveal if the email exists or not
      return {
        success: true,
        message: "Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.",
      };
    }

    // Generate temporary password for development
    const temporaryPassword = crypto.randomBytes(8).toString('hex');
    const passwordHash = await bcrypt.hash(temporaryPassword, 10);

    // Update user password
    await coursesDB.exec`
      UPDATE users 
      SET password_hash = ${passwordHash}, updated_at = NOW()
      WHERE id = ${user.id}
    `;

    // In development mode, log the temporary password
    console.log(`🔐 PASSWORD RESET - User: ${user.email}, Temporary Password: ${temporaryPassword}`);

    return {
      success: true,
      message: "Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.",
      // For development mode only
      temporaryPassword,
    };
  }
);
