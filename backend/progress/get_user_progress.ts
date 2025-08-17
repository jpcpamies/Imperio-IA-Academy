import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const coursesDB = SQLDatabase.named("courses");

export interface GetUserProgressParams {
  userId: number;
}

export interface LessonProgress {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  courseId: number;
  courseTitle: string;
  courseSlug: string;
  completed: boolean;
  completedAt: Date | null;
  orderIndex: number;
}

export interface CourseProgress {
  courseId: number;
  courseTitle: string;
  courseSlug: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lessons: LessonProgress[];
}

export interface GetUserProgressResponse {
  courses: CourseProgress[];
}

// Retrieves user progress across all courses.
export const getUserProgress = api<GetUserProgressParams, GetUserProgressResponse>(
  { expose: true, method: "GET", path: "/progress/user/:userId" },
  async (params) => {
    const progressData = await coursesDB.queryAll<{
      lesson_id: number;
      lesson_title: string;
      lesson_slug: string;
      course_id: number;
      course_title: string;
      course_slug: string;
      completed: boolean;
      completed_at: Date | null;
      order_index: number;
    }>`
      SELECT 
        l.id as lesson_id,
        l.title as lesson_title,
        l.slug as lesson_slug,
        c.id as course_id,
        c.title as course_title,
        c.slug as course_slug,
        COALESCE(up.completed, false) as completed,
        up.completed_at,
        l.order_index
      FROM lessons l
      JOIN courses c ON l.course_id = c.id
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ${params.userId}
      ORDER BY c.id, l.order_index
    `;

    // Group lessons by course
    const courseMap = new Map<number, CourseProgress>();

    for (const row of progressData) {
      if (!courseMap.has(row.course_id)) {
        courseMap.set(row.course_id, {
          courseId: row.course_id,
          courseTitle: row.course_title,
          courseSlug: row.course_slug,
          totalLessons: 0,
          completedLessons: 0,
          progressPercentage: 0,
          lessons: [],
        });
      }

      const course = courseMap.get(row.course_id)!;
      course.totalLessons++;
      
      if (row.completed) {
        course.completedLessons++;
      }

      course.lessons.push({
        lessonId: row.lesson_id,
        lessonTitle: row.lesson_title,
        lessonSlug: row.lesson_slug,
        courseId: row.course_id,
        courseTitle: row.course_title,
        courseSlug: row.course_slug,
        completed: row.completed,
        completedAt: row.completed_at,
        orderIndex: row.order_index,
      });
    }

    // Calculate progress percentages
    const courses = Array.from(courseMap.values()).map(course => ({
      ...course,
      progressPercentage: course.totalLessons > 0 
        ? Math.round((course.completedLessons / course.totalLessons) * 100)
        : 0,
    }));

    return { courses };
  }
);
