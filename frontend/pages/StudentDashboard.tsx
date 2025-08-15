import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, TrendingUp, Award, Play, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function StudentDashboard() {
  // Mock data - in a real app, this would come from the backend
  const [enrolledCourses] = useState([
    {
      id: 1,
      title: "Fundamentos de IA para Profesionales",
      progress: 75,
      totalLessons: 4,
      completedLessons: 3,
      lastAccessed: "hace 2 días",
      nextLesson: "IA en el Lugar de Trabajo",
      nextLessonId: 4,
    },
    {
      id: 2,
      title: "Machine Learning en Negocios",
      progress: 25,
      totalLessons: 4,
      completedLessons: 1,
      lastAccessed: "hace 1 semana",
      nextLesson: "Preparación de Datos para ML",
      nextLessonId: 6,
    },
  ]);

  const [stats] = useState({
    totalCourses: 2,
    completedCourses: 0,
    totalHours: 20,
    completedHours: 8,
    streak: 5,
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-xl text-gray-600">
            Continúa tu transformación profesional con IA. Estás haciendo un gran progreso.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Librerías Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-[#6B7BFF] mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.totalCourses}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Horas de Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-[#6B7BFF] mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.completedHours}</span>
                <span className="text-gray-500 ml-1">/{stats.totalHours}h</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Racha de Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-[#6B7BFF] mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.streak}</span>
                <span className="text-gray-500 ml-1">días</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-[#6B7BFF] mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.completedCourses}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tus Librerías</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[#6B7BFF] border-[#6B7BFF]">
                      En Progreso
                    </Badge>
                    <span className="text-sm text-gray-500">{course.lastAccessed}</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{course.title}</CardTitle>
                  <CardDescription>
                    {course.completedLessons} de {course.totalLessons} módulos completados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progreso</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link to={`/courses/${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                        Ver Librería
                      </Button>
                    </Link>
                    <Link to={`/lessons/${course.nextLessonId}`} className="flex-1">
                      <Button className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Continuar
                      </Button>
                    </Link>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">
                    Siguiente: {course.nextLesson}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Completaste "Fundamentos de Machine Learning"</p>
                    <p className="text-sm text-gray-600">hace 2 días</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Play className="h-5 w-5 text-[#6B7BFF] mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Iniciaste "Tipos de Sistemas de IA"</p>
                    <p className="text-sm text-gray-600">hace 3 días</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-[#6B7BFF] mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Te inscribiste en "Fundamentos de IA para Profesionales"</p>
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
