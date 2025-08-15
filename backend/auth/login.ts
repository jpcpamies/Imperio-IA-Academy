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
    console.log(`🔐 LOGIN ATTEMPT - Email: ${req.email}`);

    if (!req.email || !req.password) {
      console.log(`🔐 LOGIN FAILED - Missing credentials for: ${req.email}`);
      throw APIError.invalidArgument("email and password are required");
    }

    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      password_hash: string;
      name: string;
      role: string;
    }>`SELECT id, email, password_hash, name, role FROM users WHERE email = ${req.email}`;

    if (!user) {
      console.log(`🔐 LOGIN FAILED - User not found: ${req.email}`);
      throw APIError.unauthenticated("Email o contraseña incorrectos");
    }

    if (!user.password_hash) {
      console.log(`🔐 LOGIN FAILED - No password hash for user: ${req.email}`);
      throw APIError.unauthenticated("Usuario no tiene contraseña configurada");
    }

    const isValidPassword = await bcrypt.compare(req.password, user.password_hash);
    if (!isValidPassword) {
      console.log(`🔐 LOGIN FAILED - Invalid password for user: ${req.email}`);
      throw APIError.unauthenticated("Email o contraseña incorrectos");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecret(),
      { expiresIn: "7d" }
    );

    console.log(`🔐 LOGIN SUCCESS - User: ${req.email}, Role: ${user.role}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      session: {
        value: token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
    };
  }
);
