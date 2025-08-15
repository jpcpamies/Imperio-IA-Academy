import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface GetUserParams {
  id: number;
}

export interface UserDetail {
  id: number;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Retrieves a specific user by ID.
export const get = api<GetUserParams, UserDetail>(
  { expose: true, method: "GET", path: "/users/:id" },
  async (params) => {
    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      name: string;
      avatar_url: string | null;
      role: string;
      created_at: Date;
      updated_at: Date;
    }>`SELECT id, email, name, avatar_url, role, created_at, updated_at FROM users WHERE id = ${params.id}`;

    if (!user) {
      throw APIError.notFound("user not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatar_url,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
);
