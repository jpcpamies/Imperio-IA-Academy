import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const authButtons = (
    <div className="flex items-center space-x-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors"
        onClick={openLoginModal}
      >
        Iniciar Sesión
      </Button>
      <Button 
        size="sm" 
        className="bg-[#D95D39] hover:bg-[#C54A2C] text-white"
        onClick={openRegisterModal}
      >
        Inscribirse Ahora
      </Button>
    </div>
  );

  const userMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/student')}>
          Mi Panel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/courses')}>
          Mis Programas
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:h-[calc(var(--spacing)*20)] h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-[#6B7BFF] mr-3" />
                <span className="text-xl font-bold text-gray-900">AI Academia</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActive("/") ? "text-black" : "text-[#6c757d] hover:text-[#6B7BFF]"
                }`}
              >
                Home
              </Link>
              
              <Link
                to="/courses"
                className={`font-medium transition-colors ${
                  isActive("/courses") ? "text-black" : "text-[#6c757d] hover:text-[#6B7BFF]"
                }`}
              >
                Programas
              </Link>
              <Link
                to="/dashboard"
                className={`font-medium transition-colors ${
                  isActive("/dashboard") ? "text-black" : "text-[#6c757d] hover:text-[#6B7BFF]"
                }`}
              >
                Portal Ejecutivo
              </Link>
              
              {isAuthenticated ? userMenu : authButtons}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-[#6B7BFF] focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <Link
                  to="/"
                  className={`block px-3 py-2 font-medium transition-colors ${
                    isActive("/") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                <Link
                  to="/courses"
                  className={`block px-3 py-2 font-medium transition-colors ${
                    isActive("/courses") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Programas
                </Link>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 font-medium transition-colors ${
                    isActive("/dashboard") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portal Ejecutivo
                </Link>
                
                <div className="px-3 py-2 space-y-2">
                  {isAuthenticated ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    >
                      Cerrar Sesión
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors"
                        onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                      >
                        Iniciar Sesión
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-full bg-[#D95D39] hover:bg-[#C54A2C] text-white"
                        onClick={() => { openRegisterModal(); setIsMobileMenuOpen(false); }}
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
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSwitchToRegister={openRegisterModal}
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
        onSwitchToLogin={openLoginModal}
      />
    </>
  );
}
