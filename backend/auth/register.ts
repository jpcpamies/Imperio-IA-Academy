import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";

const coursesDB = SQLDatabase.named("courses");

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
}

// Registers a new user account.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
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
