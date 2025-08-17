import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

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

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`font-medium transition-colors ${
                    isActive("/dashboard") ? "text-black" : "text-[#6c757d] hover:text-[#6B7BFF]"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{user?.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      {user?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/login">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button 
                        size="sm" 
                        className="bg-[#D95D39] hover:bg-[#C54A2C] text-white"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
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

                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 font-medium transition-colors ${
                      isActive("/dashboard") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                
                <div className="px-3 py-2 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <div className="text-sm text-gray-600 mb-2">
                        Signed in as {user?.name}
                      </div>
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full mb-2">
                          Profile
                        </Button>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full mb-2">
                            Admin Panel
                          </Button>
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors mb-2"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button 
                          size="sm" 
                          className="w-full bg-[#D95D39] hover:bg-[#C54A2C] text-white"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
