import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../hooks/useAuth";
import backend from "~backend/client";
import type { LessonDetail } from "~backend/lessons/get";

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;
      
      try {
        const response = await backend.lessons.get({ id: parseInt(id) });
        setLesson(response);
      } catch (error) {
        console.error("Failed to fetch lesson:", error);
        toast({
          title: "Error",
          description: "Failed to load lesson. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, toast]);

  const handleMarkComplete = async () => {
    if (!lesson || !user) return;

    try {
      await backend.progress.markComplete({
        userId: parseInt(user.id),
        lessonId: lesson.id,
      });
      setCompleted(true);
      toast({
        title: "¡Módulo Completado!",
        description: "Excelente trabajo. Has completado este módulo.",
      });
    } catch (error) {
      console.error("Failed to mark lesson complete:", error);
      toast({
        title: "Error",
        description: "No se pudo marcar el módulo como completado.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Módulo No Encontrado</h1>
            <p className="text-gray-600 mb-8">El módulo que buscas no existe.</p>
            <Link to="/courses">
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
        <Link 
          to={`/courses/${lesson.courseId}`} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a {lesson.courseTitle}
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              30-45 minutos
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">Módulo {lesson.orderIndex}</span>
            {completed && (
              <>
                <span className="text-gray-400">•</span>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completado
                </div>
              </>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {lesson.title}
          </h1>
        </div>

        {/* Video placeholder */}
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg">Contenido de video estaría aquí</p>
                <p className="text-gray-400">Duración: 30-45 minutos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contenido del Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {lesson.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation and completion */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Módulo Anterior
          </Button>
          
          <div className="flex gap-4">
            {!completed && (
              <Button 
                onClick={handleMarkComplete}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar Completado
              </Button>
            )}
            <Button>
              Siguiente Módulo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
