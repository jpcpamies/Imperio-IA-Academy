import { api, APIError } from "encore.dev/api";
import { coursesDB } from "./db";

export interface GetCourseBySlugParams {
  slug: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  videoUrl: string | null;
  orderIndex: number;
  slug: string;
}

export interface CourseWithLessons {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  slug: string;
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

// Retrieves a specific course by slug with its lessons.
export const getBySlug = api<GetCourseBySlugParams, CourseWithLessons>(
  { expose: true, method: "GET", path: "/courses/slug/:slug" },
  async (params) => {
    const course = await coursesDB.queryRow<{
      id: number;
      title: string;
      description: string;
      thumbnail_url: string | null;
      slug: string;
      created_at: Date;
      updated_at: Date;
    }>`SELECT * FROM courses WHERE slug = ${params.slug}`;

    if (!course) {
      throw APIError.notFound("course not found");
    }

    const lessons = await coursesDB.queryAll<{
      id: number;
      title: string;
      content: string;
      video_url: string | null;
      order_index: number;
      slug: string;
    }>`SELECT * FROM lessons WHERE course_id = ${course.id} ORDER BY order_index`;

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnail_url,
      slug: course.slug,
      lessons: lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
        videoUrl: lesson.video_url,
        orderIndex: lesson.order_index,
        slug: lesson.slug,
      })),
      createdAt: course.created_at,
      updatedAt: course.updated_at,
    };
  }
);
