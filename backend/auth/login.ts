import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const coursesDB = SQLDatabase.named("courses");
const jwtSecret = secret("JWTSecret");

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  session: Cookie<"session">;
}

// Authenticates a user and returns a session token.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    if (!req.email || !req.password) {
      throw APIError.invalidArgument("email and password are required");
    }

    try {
      const user = await coursesDB.queryRow<{
        id: number;
        email: string;
        password_hash: string;
        name: string;
        role: string;
      }>`SELECT id, email, password_hash, name, role FROM users WHERE email = ${req.email}`;

      if (!user) {
        throw APIError.unauthenticated("Email o contraseña incorrectos");
      }

      if (!user.password_hash) {
        throw APIError.unauthenticated("Usuario no tiene contraseña configurada");
      }

      const isValidPassword = await bcrypt.compare(req.password, user.password_hash);

      if (!isValidPassword) {
        throw APIError.unauthenticated("Email o contraseña incorrectos");
      }

      // Generate JWT token
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
      throw APIError.internal("Error interno del servidor durante el login");
    }
  }
);
