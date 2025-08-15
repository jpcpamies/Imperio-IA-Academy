import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
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
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors"
              >
                Acceso Ejecutivo
              </Button>
              <Button 
                size="sm" 
                className="bg-[#D95D39] hover:bg-[#C54A2C] text-white"
              >
                Inscribirse Ahora
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#6B7BFF] focus:outline-none"
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
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`block px-3 py-2 font-medium transition-colors ${
                  isActive("/courses") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Programas
              </Link>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 font-medium transition-colors ${
                  isActive("/dashboard") ? "text-black bg-blue-50" : "text-[#6c757d] hover:text-[#6B7BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Portal Ejecutivo
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-gray-700 border-gray-300 hover:bg-[#6c757d] hover:text-white hover:border-[#6c757d] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Acceso Ejecutivo
                </Button>
                <Button 
                  size="sm" 
                  className="w-full bg-[#D95D39] hover:bg-[#C54A2C] text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Inscribirse Ahora
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
