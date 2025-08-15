import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListUsersResponse {
  users: User[];
}

// Retrieves all users (admin only).
export const list = api<void, ListUsersResponse>(
  { expose: true, method: "GET", path: "/users" },
  async () => {
    const rows = await coursesDB.queryAll<{
      id: number;
      email: string;
      name: string;
      avatar_url: string | null;
      role: string;
      created_at: Date;
      updated_at: Date;
    }>`SELECT id, email, name, avatar_url, role, created_at, updated_at FROM users ORDER BY created_at DESC`;

    const users: User[] = rows.map(row => ({
      id: row.id,
      email: row.email,
      name: row.name,
      avatarUrl: row.avatar_url,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return { users };
  }
);
