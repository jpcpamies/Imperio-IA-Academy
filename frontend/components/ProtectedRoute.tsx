import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      console.log(`🔐 PROTECTED ROUTE - Auth check for ${location.pathname}:`, {
        isAuthenticated,
        user: user?.email || 'none',
        loading
      });
    }
  }, [isAuthenticated, loading, user, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6B7BFF]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log(`🔐 PROTECTED ROUTE - Redirecting to login from ${location.pathname}`);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
