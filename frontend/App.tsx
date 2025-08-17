import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigation } from "./components/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { LessonPage } from "./pages/LessonPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";

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
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student" 
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/lessons/:id" 
                element={
                  <ProtectedRoute>
                    <LessonPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin-only routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <div className="min-h-screen bg-white">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                        <p className="text-gray-600 mt-4">Welcome to the admin panel. This area is restricted to administrators only.</p>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}
