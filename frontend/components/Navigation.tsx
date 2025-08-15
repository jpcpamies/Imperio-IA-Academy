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
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-[#0A2342] mr-3" />
              <span className="text-xl font-serif font-bold text-[#212529]">AI Academia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/"
              className={`text-lg font-medium transition-colors ${
                isActive("/") ? "text-[#0A2342]" : "text-[#6C757D] hover:text-[#0A2342]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`text-lg font-medium transition-colors ${
                isActive("/courses") ? "text-[#0A2342]" : "text-[#6C757D] hover:text-[#0A2342]"
              }`}
            >
              Programs
            </Link>
            <Link
              to="/dashboard"
              className={`text-lg font-medium transition-colors ${
                isActive("/dashboard") ? "text-[#0A2342]" : "text-[#6C757D] hover:text-[#0A2342]"
              }`}
            >
              Executive Portal
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-[#6C757D] text-[#6C757D] hover:bg-[#6C757D] hover:text-white font-medium px-6 py-3">
                Executive Login
              </Button>
              <Button size="sm" className="bg-[#D95D39] hover:bg-[#C54A2C] text-white font-medium px-6 py-3">
                Enroll Now
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#6C757D] hover:text-[#0A2342] focus:outline-none"
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
                className={`block px-3 py-3 text-lg font-medium transition-colors ${
                  isActive("/") ? "text-[#0A2342] bg-gray-50" : "text-[#6C757D] hover:text-[#0A2342]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`block px-3 py-3 text-lg font-medium transition-colors ${
                  isActive("/courses") ? "text-[#0A2342] bg-gray-50" : "text-[#6C757D] hover:text-[#0A2342]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Programs
              </Link>
              <Link
                to="/dashboard"
                className={`block px-3 py-3 text-lg font-medium transition-colors ${
                  isActive("/dashboard") ? "text-[#0A2342] bg-gray-50" : "text-[#6C757D] hover:text-[#0A2342]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Executive Portal
              </Link>
              <div className="px-3 py-2 space-y-3">
                <Button variant="outline" size="sm" className="w-full border-[#6C757D] text-[#6C757D] hover:bg-[#6C757D] hover:text-white font-medium">
                  Executive Login
                </Button>
                <Button size="sm" className="w-full bg-[#D95D39] hover:bg-[#C54A2C] text-white font-medium">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
