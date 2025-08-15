import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import backend from "~backend/client";
import type { Course } from "~backend/courses/list";

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await backend.courses.list();
        setCourses(response.courses);
        setFilteredCourses(response.courses);
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

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border border-gray-200 bg-white shadow-sm">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Librerías de Conocimiento IA
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Explora nuestras librerías especializadas diseñadas para profesionales como tú.
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar librerías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-[#6B7BFF] focus:ring-[#6B7BFF]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`${getDifficultyColor(course.difficultyLevel)} rounded-full px-3 py-1 text-xs`}>
                    {course.difficultyLevel}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-900">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-3 text-gray-600">
                  {course.description}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.durationHours}h
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Librería
                  </div>
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white rounded-lg">
                    Explorar Librería
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No se encontraron librerías que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
