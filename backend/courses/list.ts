import { api } from "encore.dev/api";
import { coursesDB } from "./db";

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListCoursesResponse {
  courses: Course[];
}

// Retrieves all available courses.
export const list = api<void, ListCoursesResponse>(
  { expose: true, method: "GET", path: "/courses" },
  async () => {
    const rows = await coursesDB.queryAll<{
      id: number;
      title: string;
      description: string;
      thumbnail_url: string | null;
      slug: string;
      created_at: Date;
      updated_at: Date;
    }>`SELECT * FROM courses ORDER BY created_at DESC`;

    const courses: Course[] = rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      thumbnailUrl: row.thumbnail_url,
      slug: row.slug,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return { courses };
  }
);
