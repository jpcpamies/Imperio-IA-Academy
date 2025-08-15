import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

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

      // Simple password check
      if (user.password_hash !== req.password) {
        throw APIError.unauthenticated("Email o contraseña incorrectos");
      }

      // Create simple session token
      const sessionToken = `session_${user.id}_${Date.now()}`;

      const sessionCookie = {
        value: sessionToken,
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
      if (error instanceof APIError) {
        throw error;
      }
      
      throw APIError.internal("Error interno del servidor durante el login");
    }
  }
);
