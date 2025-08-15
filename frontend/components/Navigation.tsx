import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Imperio IA con jordipamies" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-[#6B7BFF]" : "text-gray-700 hover:text-[#6B7BFF]"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${
                isActive("/courses") ? "text-[#6B7BFF]" : "text-gray-700 hover:text-[#6B7BFF]"
              }`}
            >
              Librerías
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard") ? "text-[#6B7BFF]" : "text-gray-700 hover:text-[#6B7BFF]"
              }`}
            >
              Mi Progreso
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors ${
                isActive("/admin") ? "text-[#6B7BFF]" : "text-gray-700 hover:text-[#6B7BFF]"
              }`}
            >
              Admin
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                Acceder
              </Button>
              <Button size="sm" className="bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white">
                Comenzar
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <Link
                to="/"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/") ? "text-[#6B7BFF] bg-blue-50" : "text-gray-700 hover:text-[#6B7BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/courses"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/courses") ? "text-[#6B7BFF] bg-blue-50" : "text-gray-700 hover:text-[#6B7BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Librerías
              </Link>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/dashboard") ? "text-[#6B7BFF] bg-blue-50" : "text-gray-700 hover:text-[#6B7BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Mi Progreso
              </Link>
              <Link
                to="/admin"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/admin") ? "text-[#6B7BFF] bg-blue-50" : "text-gray-700 hover:text-[#6B7BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                  Acceder
                </Button>
                <Button size="sm" className="w-full bg-[#6B7BFF] hover:bg-[#5A6AEF] text-white">
                  Comenzar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
