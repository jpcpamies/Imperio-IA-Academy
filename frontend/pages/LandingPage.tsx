import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoursePreview } from "../components/CoursePreview";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#635BFF] to-[#5048E5] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform AI Fear into
              <span className="block text-yellow-300">Competitive Advantage</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Master artificial intelligence with practical courses designed for professionals 30+. 
              No technical background required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#635BFF] hover:bg-gray-100">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#635BFF]">
                View Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed specifically for busy professionals who want to understand and leverage AI in their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-[#635BFF] mx-auto mb-4" />
                <CardTitle>Practical Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-world applications and case studies that you can immediately apply in your workplace.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#635BFF] mx-auto mb-4" />
                <CardTitle>Career Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gain the AI literacy needed to advance your career and stay competitive in the modern workplace.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-[#635BFF] mx-auto mb-4" />
                <CardTitle>Expert Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn from industry professionals who understand both AI technology and business applications.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your AI journey with our carefully crafted courses for professionals.
            </p>
          </div>

          <CoursePreview />

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" className="bg-[#635BFF] hover:bg-[#5048E5]">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#635BFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Master AI?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who have transformed their careers with AI knowledge.
          </p>
          <Button size="lg" className="bg-white text-[#635BFF] hover:bg-gray-100">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
