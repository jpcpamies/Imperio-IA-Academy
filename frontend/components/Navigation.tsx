import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      console.log(`🔐 NAVIGATION - Starting logout process`);
      await logout();
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
      });
      
      console.log(`🔐 NAVIGATION - Redirecting to home page`);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("🔐 NAVIGATION - Logout error:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al cerrar sesión, pero se ha limpiado tu sesión local.",
        variant: "destructive",
      });
      // Still redirect even if there was an error
      navigate("/", { replace: true });
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:h-[calc(var(--spacing)*20)] h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-[#6B7BFF] mr-3" />
              <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")' }}>AI Academia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive("/") ? "text-black" : "text-[#6c757d] hover:text-[#6B7BFF]"
              }`}
              style={{ 
                fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                fontSize: '18px'
              }}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/courses"
                  className={`font-medium transition-colors ${
                    isActive("/courses") ? "text-black" : "text-[#6c757d] hover:text-[#6B7BFF]"
                  }`}
                  style={{ 
                    fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                    fontSize: '18px'
                  }}
                >
                  Programas
                </Link>
                <Link
                  to="/dashboard"
                  className={`font-medium transition-colors ${
                    isActive("/dashboard") ? "text-black" : "text-[#6c757d] hover:text-[#6B7BFF]"
                  }`}
                  style={{ 
                    fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                    fontSize: '18px'
                  }}
                >
                  Portal Ejecutivo
                </Link>
              </>
            )}
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50" disabled={isLoggingOut}>
                      <User className="h-4 w-4 mr-2" />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors"
                    style={{ 
                      fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                      fontSize: '16px'
                    }}
                    onClick={handleLoginClick}
                  >
                    Acceso Ejecutivo
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#D95D39] hover:bg-[#C54A2C] text-white"
                    style={{ 
                      fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                      fontSize: '16px'
                    }}
                    onClick={handleRegisterClick}
                  >
                    Inscribirse Ahora
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#6B7BFF] focus:outline-none"
              disabled={isLoggingOut}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                to="/"
                className={`block px-3 py-2 font-medium transition-colors ${
                  isActive("/") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                }`}
                style={{ 
                  fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                  fontSize: '18px'
                }}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/courses"
                    className={`block px-3 py-2 font-medium transition-colors ${
                      isActive("/courses") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                    }`}
                    style={{ 
                      fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                      fontSize: '18px'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    Programas
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 font-medium transition-colors ${
                      isActive("/dashboard") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                    }`}
                    style={{ 
                      fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                      fontSize: '18px'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    Portal Ejecutivo
                  </Link>
                </>
              )}
              <div className="px-3 py-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="text-sm text-gray-600 mb-2">
                      Conectado como: {user?.name}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                      onClick={() => {
                        navigate("/profile");
                        setIsOpen(false);
                      }}
                      disabled={isLoggingOut}
                    >
                      Perfil
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors"
                      style={{ 
                        fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                        fontSize: '16px'
                      }}
                      onClick={() => {
                        handleLoginClick();
                        setIsOpen(false);
                      }}
                    >
                      Acceso Ejecutivo
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full bg-[#D95D39] hover:bg-[#C54A2C] text-white"
                      style={{ 
                        fontFamily: 'var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji")',
                        fontSize: '16px'
                      }}
                      onClick={() => {
                        handleRegisterClick();
                        setIsOpen(false);
                      }}
                    >
                      Inscribirse Ahora
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
