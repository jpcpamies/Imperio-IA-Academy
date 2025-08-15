import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Users, TrendingUp, Edit, Trash2, Eye, RotateCcw, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import backend from "~backend/client";

export function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [resettingPassword, setResettingPassword] = useState<number | null>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await backend.users.list();
      setUsers(response.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (userId: number, userEmail: string) => {
    setResettingPassword(userId);
    try {
      const response = await backend.auth.adminResetPassword({ userId });
      
      if (response.success) {
        toast({
          title: "Contraseña restablecida",
          description: `Nueva contraseña temporal para ${userEmail}: ${response.temporaryPassword}`,
        });
        
        console.log(`🔐 ADMIN RESET - User: ${userEmail}, New Password: ${response.temporaryPassword}`);
      }
    } catch (error: any) {
      console.error("Failed to reset password:", error);
      toast({
        title: "Error",
        description: "No se pudo restablecer la contraseña.",
        variant: "destructive",
      });
    } finally {
      setResettingPassword(null);
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                <span className="text-2xl font-bold text-gray-900">{users.length}</span>
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

        {/* User Management */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
          </div>

          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Modo Desarrollo:</strong> Las contraseñas restablecidas se muestran en la consola del navegador y en las notificaciones.
            </AlertDescription>
          </Alert>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B7BFF] mx-auto"></div>
                  <p className="mt-2 text-gray-600">Cargando usuarios...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleResetPassword(user.id, user.email)}
                              disabled={resettingPassword === user.id}
                              className="text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                            >
                              {resettingPassword === user.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                              ) : (
                                <RotateCcw className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
      </div>
    </div>
  );
}
