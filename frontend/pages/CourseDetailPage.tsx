import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, BookOpen, Play, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import backend from "~backend/client";
import type { CourseWithLessons } from "~backend/courses/get";

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseWithLessons | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        const response = await backend.courses.get({ id: parseInt(id) });
        setCourse(response);
      } catch (error) {
        console.error("Failed to fetch course:", error);
        toast({
          title: "Error",
          description: "Failed to load course. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, toast]);

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button className="bg-[#635BFF] hover:bg-[#5048E5] text-white">Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalDuration = course.lessons.reduce((total, lesson) => total + lesson.durationMinutes, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/courses" className="inline-flex items-center text-[#635BFF] hover:text-[#5048E5] mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Badge className={getDifficultyColor(course.difficultyLevel)}>
            {course.difficultyLevel}
          </Badge>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            {course.durationHours}h total
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-1" />
            {course.lessons.length} lessons
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {course.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {course.description}
        </p>

        <Button size="lg" className="bg-[#635BFF] hover:bg-[#5048E5] text-white">
          Enroll in Course
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <span className="bg-[#635BFF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                      {index + 1}
                    </span>
                    {lesson.title}
                  </CardTitle>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.durationMinutes}m
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {lesson.content.substring(0, 150)}...
                </CardDescription>
                <Link to={`/lessons/${lesson.id}`}>
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                    <Play className="h-4 w-4 mr-2" />
                    Start Lesson
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
