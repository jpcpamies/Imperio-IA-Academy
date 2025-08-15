import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, TrendingUp, Award, Play, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../hooks/useAuth";
import backend from "~backend/client";
import type { Course } from "~backend/courses/list";

export function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Mock progress data - in a real app, this would come from the backend
  const [stats] = useState({
    totalCourses: 4,
    completedCourses: 0,
    totalHours: 20,
    completedHours: 8,
    streak: 5,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await backend.courses.list();
        setCourses(response.courses.slice(0, 2)); // Show first 2 courses as "enrolled"
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
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
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
            ¡Bienvenido de vuelta, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Continúa tu transformación profesional con IA. Estás haciendo un gran progreso.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Programas Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{courses.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Horas de Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.completedHours}</span>
                <span className="text-gray-500 ml-1">/{stats.totalHours}h</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Racha de Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.streak}</span>
                <span className="text-gray-500 ml-1">días</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.completedCourses}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tus Programas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      En Progreso
                    </Badge>
                    <span className="text-sm text-gray-500">hace {index + 1} día{index > 0 ? 's' : ''}</span>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>
                    {index === 0 ? '3 de 5' : '1 de 5'} módulos completados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progreso</span>
                      <span>{index === 0 ? '60' : '20'}%</span>
                    </div>
                    <Progress value={index === 0 ? 60 : 20} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link to={`/courses/${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Ver Programa
                      </Button>
                    </Link>
                    <Link to={`/courses/${course.id}`} className="flex-1">
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Continuar
                      </Button>
                    </Link>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">
                    Siguiente: {index === 0 ? 'Automatizar redes sociales con IA' : 'GPT para fórmulas complejas'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Completaste "ChatGPT para crear copys que conviertan"</p>
                    <p className="text-sm text-gray-600">hace 2 días</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Play className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Iniciaste "¿Por qué el marketing tradicional ya no funciona?"</p>
                    <p className="text-sm text-gray-600">hace 3 días</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Te inscribiste en "IA para Profesionales del Marketing"</p>
                    <p className="text-sm text-gray-600">hace 1 semana</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
