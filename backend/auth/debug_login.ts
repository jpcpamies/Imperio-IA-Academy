import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface DebugLoginRequest {
  email: string;
}

export interface DebugLoginResponse {
  userExists: boolean;
  userInfo?: {
    id: number;
    email: string;
    name: string;
    role: string;
    hasPassword: boolean;
  };
}

// Debug endpoint to check user login status (development only).
export const debugLogin = api<DebugLoginRequest, DebugLoginResponse>(
  { expose: true, method: "POST", path: "/auth/debug/login" },
  async (req) => {
    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      name: string;
      role: string;
      password_hash: string;
    }>`SELECT id, email, name, role, password_hash FROM users WHERE email = ${req.email}`;

    if (!user) {
      console.log(`🐛 DEBUG LOGIN - User not found: ${req.email}`);
      return {
        userExists: false,
      };
    }

    console.log(`🐛 DEBUG LOGIN - User found: ${user.email}, Role: ${user.role}, Has Password: ${!!user.password_hash}`);

    return {
      userExists: true,
      userInfo: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        hasPassword: !!user.password_hash,
      },
    };
  }
);
