import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../hooks/useAuth";
import backend from "~backend/client";
import type { Course } from "~backend/courses/list";

export function CoursePreview() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

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
          <Card key={i} className="animate-pulse">
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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge className="bg-green-100 text-green-800">
                Profesional
              </Badge>
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm text-gray-600 ml-1">4.8</span>
              </div>
            </div>
            <CardTitle className="text-lg">{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4 line-clamp-3">
              {course.description}
            </CardDescription>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                8-12h
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                Programa
              </div>
            </div>
            {isAuthenticated ? (
              <Link to={`/courses/${course.id}`}>
                <Button className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white">
                  Ver Programa
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white">
                  Acceder al Programa
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
