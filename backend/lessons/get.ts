import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface GetLessonParams {
  id: number;
}

export interface LessonDetail {
  id: number;
  courseId: number;
  title: string;
  content: string;
  videoUrl: string | null;
  orderIndex: number;
  durationMinutes: number;
  courseTitle: string;
}

// Retrieves a specific lesson with course information.
export const get = api<GetLessonParams, LessonDetail>(
  { expose: true, method: "GET", path: "/lessons/:id" },
  async (params) => {
    const lesson = await coursesDB.queryRow<{
      id: number;
      course_id: number;
      title: string;
      content: string;
      video_url: string | null;
      order_index: number;
      duration_minutes: number;
      course_title: string;
    }>`
      SELECT l.*, c.title as course_title 
      FROM lessons l 
      JOIN courses c ON l.course_id = c.id 
      WHERE l.id = ${params.id}
    `;

    if (!lesson) {
      throw APIError.notFound("lesson not found");
    }

    return {
      id: lesson.id,
      courseId: lesson.course_id,
      title: lesson.title,
      content: lesson.content,
      videoUrl: lesson.video_url,
      orderIndex: lesson.order_index,
      durationMinutes: lesson.duration_minutes,
      courseTitle: lesson.course_title,
    };
  }
);
