import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-[#635BFF]" />
              <span className="text-xl font-bold text-gray-900">AI Academy</span>
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
              Home
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${
                isActive("/courses") ? "text-[#635BFF]" : "text-gray-700 hover:text-[#635BFF]"
              }`}
            >
              Courses
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
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button size="sm" className="bg-[#635BFF] hover:bg-[#5048E5]">
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/") ? "text-[#635BFF] bg-purple-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/courses") ? "text-[#635BFF] bg-purple-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/dashboard") ? "text-[#635BFF] bg-purple-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/admin"
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive("/admin") ? "text-[#635BFF] bg-purple-50" : "text-gray-700 hover:text-[#635BFF]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
                <Button size="sm" className="w-full bg-[#635BFF] hover:bg-[#5048E5]">
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
