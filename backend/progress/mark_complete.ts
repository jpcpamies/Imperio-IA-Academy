import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface MarkCompleteParams {
  userId: number;
  lessonId: number;
}

export interface MarkCompleteResponse {
  success: boolean;
  completedAt: Date;
}

// Marks a lesson as completed for a user.
export const markComplete = api<MarkCompleteParams, MarkCompleteResponse>(
  { expose: true, method: "POST", path: "/progress/complete" },
  async (params) => {
    // Verify lesson exists
    const lesson = await coursesDB.queryRow<{ id: number }>`
      SELECT id FROM lessons WHERE id = ${params.lessonId}
    `;

    if (!lesson) {
      throw APIError.notFound("lesson not found");
    }

    // Verify user exists
    const user = await coursesDB.queryRow<{ id: number }>`
      SELECT id FROM users WHERE id = ${params.userId}
    `;

    if (!user) {
      throw APIError.notFound("user not found");
    }

    const completedAt = new Date();

    // Insert or update progress record
    await coursesDB.exec`
      INSERT INTO user_progress (user_id, lesson_id, completed, completed_at, created_at)
      VALUES (${params.userId}, ${params.lessonId}, true, ${completedAt}, NOW())
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET 
        completed = true,
        completed_at = ${completedAt}
    `;

    return {
      success: true,
      completedAt,
    };
  }
);
