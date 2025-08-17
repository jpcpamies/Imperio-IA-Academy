import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { LessonPage } from "./pages/LessonPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AcademyDashboard } from "./pages/AcademyDashboard";
import { AcademyCoursesPage } from "./pages/AcademyCoursesPage";
import { AcademyCourseDetailPage } from "./pages/AcademyCourseDetailPage";
import { AcademyLessonPage } from "./pages/AcademyLessonPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailPage />} />
              <Route path="/lessons/:id" element={<LessonPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/student" element={<StudentDashboard />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected academy routes */}
              <Route path="/academy/dashboard" element={
                <ProtectedRoute>
                  <AcademyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/academy/courses" element={
                <ProtectedRoute>
                  <AcademyCoursesPage />
                </ProtectedRoute>
              } />
              <Route path="/academy/courses/:id" element={
                <ProtectedRoute>
                  <AcademyCourseDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/academy/lessons/:id" element={
                <ProtectedRoute>
                  <AcademyLessonPage />
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute requireAdmin>
                  <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Panel de Administración</h1>
                      <p className="text-gray-600">Funcionalidad de administración en desarrollo...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}
