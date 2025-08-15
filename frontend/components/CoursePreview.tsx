import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import backend from "~backend/client";
import type { Course } from "~backend/courses/list";

export function CoursePreview() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await backend.courses.list();
        setCourses(response.courses.slice(0, 4)); // Show only first 4 courses
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse border-0 shadow-lg">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start mb-4">
              <Badge className={`${getDifficultyColor(course.difficultyLevel)} rounded-full px-3 py-1`}>
                {course.difficultyLevel}
              </Badge>
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm text-gray-600 ml-1">4.8</span>
              </div>
            </div>
            <CardTitle className="text-xl font-bold leading-tight">{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-6 line-clamp-3 text-gray-600 leading-relaxed">
              {course.description}
            </CardDescription>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.durationHours}h
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                Course
              </div>
            </div>
            <Link to={`/courses/${course.id}`}>
              <Button className="w-full bg-[#635BFF] hover:bg-[#5048E5] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                View Course
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
