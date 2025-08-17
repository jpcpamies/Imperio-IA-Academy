import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, BookOpen, Play, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import backend from "~backend/client";
import type { CourseWithLessons } from "~backend/courses/get";

export function AcademyCourseDetailPage() {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
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
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Programa No Encontrado</h1>
            <p className="text-gray-600 mb-8">El programa que buscas no existe.</p>
            <Link to="/academy/courses">
              <Button>Volver a Programas</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/academy/courses" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Programas
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-blue-100 text-blue-800">
              Profesional
            </Badge>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              8-12h total
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="h-4 w-4 mr-1" />
              {course.lessons.length} módulos
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {course.description}
          </p>

          <Button size="lg" className="bg-[#D95D39] hover:bg-[#C54A2C] text-white">
            Inscribirse en el Programa
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contenido del Programa</h2>
          <div className="space-y-4">
            {course.lessons.map((lesson, index) => (
              <Card key={lesson.id} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                        {index + 1}
                      </span>
                      {lesson.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      30-45m
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {lesson.content.substring(0, 150)}...
                  </CardDescription>
                  <Link to={`/academy/lessons/${lesson.id}`}>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Módulo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
