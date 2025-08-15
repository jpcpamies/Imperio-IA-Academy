import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Users, TrendingUp, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminDashboard() {
  // Mock data - in a real app, this would come from the backend
  const [stats] = useState({
    totalCourses: 4,
    totalStudents: 156,
    totalLessons: 16,
    avgProgress: 68,
  });

  const [courses] = useState([
    {
      id: 1,
      title: "Fundamentos de IA para Profesionales",
      students: 89,
      lessons: 4,
      status: "published",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      title: "Machine Learning en Negocios",
      students: 67,
      lessons: 4,
      status: "published",
      lastUpdated: "2024-01-10",
    },
    {
      id: 3,
      title: "Fundamentos de Procesamiento de Lenguaje Natural",
      students: 45,
      lessons: 4,
      status: "draft",
      lastUpdated: "2024-01-08",
    },
    {
      id: 4,
      title: "Ética y Gobernanza de IA",
      students: 78,
      lessons: 4,
      status: "published",
      lastUpdated: "2024-01-05",
    },
  ]);

  const [recentStudents] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", enrolled: "2024-01-15", progress: 75 },
    { id: 2, name: "María García", email: "maria@example.com", enrolled: "2024-01-14", progress: 45 },
    { id: 3, name: "Carlos López", email: "carlos@example.com", enrolled: "2024-01-13", progress: 90 },
    { id: 4, name: "Ana Martínez", email: "ana@example.com", enrolled: "2024-01-12", progress: 30 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Panel de Administración
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona tu ecosistema de aprendizaje IA, librerías y progreso de estudiantes.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Librerías</CardTitle>
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
              <CardTitle className="text-sm font-medium text-gray-600">Total Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-[#6B7BFF] mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.totalStudents}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Módulos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-[#6B7BFF] mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.totalLessons}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Progreso Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-[#6B7BFF] mr-2" />
                <span className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Management */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Librerías</h2>
            <Button className="bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Crear Librería
            </Button>
          </div>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título de la Librería</TableHead>
                    <TableHead>Estudiantes</TableHead>
                    <TableHead>Módulos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última Actualización</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium text-gray-900">{course.title}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>{course.lessons}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status === 'published' ? 'Publicado' : 'Borrador'}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Students */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Actividad Reciente de Estudiantes</h2>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Estudiante</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Inscrito</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium text-gray-900">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.enrolled}</TableCell>
                      <TableCell>{student.progress}%</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
