import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoursePreview } from "../components/CoursePreview";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0A2342] text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              Executive AI Leadership Development
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 font-light leading-relaxed">
              Strategic artificial intelligence education designed for senior professionals and industry leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold px-10 py-6 rounded-lg">
                  Explore Executive Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-white bg-transparent hover:bg-white hover:text-[#0A2342] font-semibold px-10 py-6 rounded-lg">
                Leadership Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#212529] mb-6">
              Executive Development Programs
            </h2>
            <p className="text-xl text-[#6C757D] font-light leading-relaxed">
              Comprehensive AI leadership curricula designed for strategic business application
            </p>
          </div>
          <CoursePreview />
          <div className="text-center mt-16">
            <Link to="/courses">
              <Button size="lg" className="bg-[#0A2342] text-white hover:bg-[#0F2A4A] font-semibold px-10 py-6 rounded-lg">
                View All Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#212529] mb-6">
              Distinguished Executive Education
            </h2>
            <p className="text-xl text-[#6C757D] font-light leading-relaxed">
              Strategic AI education designed specifically for accomplished business leaders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="text-center border-0 shadow-xl bg-white">
              <CardHeader>
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                  <BookOpen className="h-10 w-10 text-[#0A2342]" />
                </div>
                <CardTitle className="text-xl font-serif font-bold text-[#212529]">Industry Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-[#6C757D] font-light leading-relaxed">
                  Learn from distinguished practitioners with proven track records in enterprise AI implementation and strategic transformation
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-xl bg-white">
              <CardHeader>
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                  <Users className="h-10 w-10 text-[#0A2342]" />
                </div>
                <CardTitle className="text-xl font-serif font-bold text-[#212529]">Executive Peer Network</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-[#6C757D] font-light leading-relaxed">
                  Connect with a curated community of senior professionals and industry leaders navigating similar strategic challenges
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-xl bg-white">
              <CardHeader>
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                  <Award className="h-10 w-10 text-[#0A2342]" />
                </div>
                <CardTitle className="text-xl font-serif font-bold text-[#212529]">Strategic Certification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-[#6C757D] font-light leading-relaxed">
                  Earn prestigious credentials that validate your strategic AI leadership capabilities to boards and stakeholders
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#0A2342] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            Advance Your Strategic Leadership in the AI Era
          </h2>
          <p className="text-xl mb-12 text-gray-200 font-light leading-relaxed">
            Join distinguished executives who are establishing competitive advantages through strategic AI adoption and organizational transformation
          </p>
          <Link to="/courses">
            <Button size="lg" className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold px-12 py-6 rounded-lg">
              Begin Executive Development
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
