import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const coursesDB = SQLDatabase.named("courses");
const jwtSecret = secret("JWTSecret");

export interface ForceLoginRequest {
  email: string;
  devKey: string;
}

export interface ForceLoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  session: Cookie<"session">;
  warning: string;
}

// Development-only force login endpoint (bypasses password verification).
export const forceLogin = api<ForceLoginRequest, ForceLoginResponse>(
  { expose: true, method: "POST", path: "/auth/force-login" },
  async (req) => {
    console.log(`🔐 FORCE LOGIN ATTEMPT - Email: ${req.email}`);

    // Simple dev key check (in production, this endpoint should not exist)
    if (req.devKey !== "dev123") {
      console.log(`🔐 FORCE LOGIN FAILED - Invalid dev key`);
      throw APIError.unauthenticated("Invalid development key");
    }

    if (!req.email) {
      console.log(`🔐 FORCE LOGIN FAILED - Missing email`);
      throw APIError.invalidArgument("email is required");
    }

    try {
      console.log(`🔐 FORCE LOGIN STEP 1 - Fetching user: ${req.email}`);
      
      const user = await coursesDB.queryRow<{
        id: number;
        email: string;
        name: string;
        role: string;
      }>`SELECT id, email, name, role FROM users WHERE email = ${req.email}`;

      if (!user) {
        console.log(`🔐 FORCE LOGIN FAILED - User not found: ${req.email}`);
        throw APIError.notFound("User not found");
      }

      console.log(`🔐 FORCE LOGIN STEP 2 - User found: ${user.email}, ID: ${user.id}, Role: ${user.role}`);

      console.log(`🔐 FORCE LOGIN STEP 3 - Generating JWT token for: ${req.email}`);

      let token = "";
      try {
        const jwtSecretValue = jwtSecret();
        console.log(`🔐 FORCE LOGIN STEP 3 - JWT secret available: ${!!jwtSecretValue}`);

        token = jwt.sign(
          { userId: user.id, email: user.email },
          jwtSecretValue,
          { expiresIn: "7d" }
        );
        console.log(`🔐 FORCE LOGIN STEP 3 - JWT token generated successfully`);
      } catch (jwtError) {
        console.error(`🔐 FORCE LOGIN STEP 3 - JWT generation error:`, jwtError);
        throw APIError.internal("Error during token generation");
      }

      const sessionCookie = {
        value: token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax" as const,
      };

      const response = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: sessionCookie,
        warning: "⚠️ DEVELOPMENT MODE: Password verification bypassed",
      };

      console.log(`🔐 FORCE LOGIN SUCCESS - User: ${req.email}, Role: ${user.role}, ID: ${user.id}`);
      return response;

    } catch (error) {
      console.error(`🔐 FORCE LOGIN ERROR - Unexpected error for ${req.email}:`, error);
      
      // Re-throw APIErrors as-is
      if (error instanceof APIError) {
        throw error;
      }
      
      // Wrap other errors
      throw APIError.internal("Error interno del servidor durante force login");
    }
  }
);
