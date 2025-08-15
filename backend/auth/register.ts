import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const coursesDB = SQLDatabase.named("courses");
const jwtSecret = secret("JWTSecret");

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  session: Cookie<"session">;
}

// Registers a new user account.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    if (!req.email || !req.password || !req.name) {
      throw APIError.invalidArgument("email, password, and name are required");
    }

    if (req.password.length < 6) {
      throw APIError.invalidArgument("password must be at least 6 characters");
    }

    try {
      // Check if user already exists
      const existingUser = await coursesDB.queryRow<{ id: number }>`
        SELECT id FROM users WHERE email = ${req.email}
      `;

      if (existingUser) {
        throw APIError.alreadyExists("user with this email already exists");
      }

      // Hash password
      const passwordHash = await bcrypt.hash(req.password, 10);

      // Create user
      const user = await coursesDB.queryRow<{
        id: number;
        email: string;
        name: string;
        role: string;
      }>`
        INSERT INTO users (email, password_hash, name, role, created_at, updated_at)
        VALUES (${req.email}, ${passwordHash}, ${req.name}, 'user', NOW(), NOW())
        RETURNING id, email, name, role
      `;

      if (!user) {
        throw APIError.internal("failed to create user");
      }

      // Generate JWT token for immediate login
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret(),
        { expiresIn: "7d" }
      );

      const sessionCookie = {
        value: token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax" as const,
      };

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: sessionCookie,
      };

    } catch (error) {
      // Re-throw APIErrors as-is
      if (error instanceof APIError) {
        throw error;
      }
      
      // Wrap other errors
      throw APIError.internal("Error interno del servidor durante el registro");
    }
  }
);
