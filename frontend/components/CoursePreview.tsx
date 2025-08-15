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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse border-0 shadow-xl">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-[#7ED321] text-white";
      case "intermediate":
        return "bg-[#D95D39] text-white";
      case "advanced":
        return "bg-[#0A2342] text-white";
      default:
        return "bg-[#6C757D] text-white";
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {courses.map((course) => (
        <Card key={course.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
          <CardHeader className="pb-6">
            <div className="flex justify-between items-start mb-6">
              <Badge className={`${getDifficultyColor(course.difficultyLevel)} rounded-lg px-4 py-2 font-medium`}>
                {course.difficultyLevel}
              </Badge>
              <div className="flex items-center text-[#D95D39]">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm text-[#6C757D] ml-1 font-medium">4.8</span>
              </div>
            </div>
            <CardTitle className="text-xl font-serif font-bold leading-tight text-[#212529]">{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-8 line-clamp-3 text-[#6C757D] leading-relaxed text-lg font-light">
              {course.description}
            </CardDescription>
            <div className="flex items-center justify-between text-sm text-[#6C757D] mb-8 font-medium">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {course.durationHours}h
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Executive
              </div>
            </div>
            <Link to={`/courses/${course.id}`}>
              <Button className="w-full bg-[#0A2342] hover:bg-[#0F2A4A] text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                View Program
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
