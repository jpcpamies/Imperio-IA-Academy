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
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#635BFF] rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Academia</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-[#635BFF]" : "text-gray-700 hover:text-[#635BFF]"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${
                isActive("/courses") ? "text-[#635BFF]" : "text-gray-700 hover:text-[#635BFF]"
              }`}
            >
              Cursos
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard") ? "text-[#635BFF]" : "text-gray-700 hover:text-[#635BFF]"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors ${
                isActive("/admin") ? "text-[#635BFF]" : "text-gray-700 hover:text-[#635BFF]"
              }`}
            >
              Admin
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                Login
              </Button>
              <Button size="sm" className="bg-[#635BFF] hover:bg-[#5048E5] text-white">
                Sign Up
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#635BFF] focus:outline-none"
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
                  isActive("/") ? "text-[#635BFF] bg-blue-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/courses"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/courses") ? "text-[#635BFF] bg-blue-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Cursos
              </Link>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/dashboard") ? "text-[#635BFF] bg-blue-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/admin"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/admin") ? "text-[#635BFF] bg-blue-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                  Login
                </Button>
                <Button size="sm" className="w-full bg-[#635BFF] hover:bg-[#5048E5] text-white">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
