import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, TrendingUp, Users, AlertTriangle, Clock, Target, CheckCircle, Award, Briefcase, Star, Quote, X, BookOpen, Shield, Zap, Crown, HelpCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoModal } from "../components/VideoModal";

export function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A2342] text-white py-32">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/3 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          
          {/* Professional geometric patterns */}
          <svg className="absolute top-20 left-1/4 w-32 h-32 text-white/5" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-40 right-1/4 w-24 h-24 text-white/3" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
          
          {/* Subtle grid lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <path d="M0,400 Q300,200 600,400 T1200,400" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
              <path d="M0,500 Q400,300 800,500 T1200,500" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-12 leading-tight tracking-tight text-white">
              Executive Leadership in the Age of Artificial Intelligence
            </h1>
            <h2 className="text-2xl md:text-3xl mb-12 text-gray-200 font-light leading-relaxed max-w-4xl mx-auto">
              Transform Strategic Uncertainty into Competitive Advantage
              <span className="block text-xl md:text-2xl mt-6 font-normal opacity-90">
                A Comprehensive Executive Development Program for Senior Professionals
              </span>
            </h2>
            <p className="text-lg md:text-xl mb-16 text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              For accomplished professionals who recognize that artificial intelligence represents the most significant 
              business transformation since the internet. Join industry leaders who are already leveraging AI to drive 
              organizational excellence and strategic innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button 
                size="lg" 
                className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold text-lg px-12 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={openVideoModal}
              >
                <Play className="mr-3 h-6 w-6" />
                Executive Program Overview
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 text-white bg-transparent hover:bg-white hover:text-[#0A2342] font-semibold px-12 py-6 rounded-lg transition-all duration-300"
              >
                Leadership Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Challenge Section */}
      <section className="py-32 bg-[#F8F9FA] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-full p-8">
                <AlertTriangle className="h-16 w-16 text-[#6C757D]" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-12 leading-tight">
              The Strategic Imperative: AI Leadership in Enterprise
            </h2>
            <p className="text-xl text-[#6C757D] max-w-4xl mx-auto mb-20 leading-relaxed font-light">
              While organizations debate AI implementation strategies, forward-thinking executives are already 
              establishing competitive advantages through strategic AI adoption and organizational transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                  <AlertTriangle className="h-12 w-12 text-[#6C757D]" />
                </div>
                <CardTitle className="text-3xl font-serif font-bold text-[#212529] mb-4">82%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#212529] font-medium text-lg mb-6 leading-relaxed">
                  of enterprise leaders report inadequate AI readiness within their organizations
                </p>
                <p className="text-sm text-[#6C757D] font-light">
                  Source: Microsoft Work Trend Index 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                  <TrendingUp className="h-12 w-12 text-[#6C757D]" />
                </div>
                <CardTitle className="text-3xl font-serif font-bold text-[#212529] mb-4">25%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#212529] font-medium text-lg mb-6 leading-relaxed">
                  productivity advantage for executives with advanced AI competencies
                </p>
                <p className="text-sm text-[#6C757D] font-light">
                  Source: LinkedIn Economic Graph 2024
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                  <Clock className="h-12 w-12 text-[#6C757D]" />
                </div>
                <CardTitle className="text-3xl font-serif font-bold text-[#212529] mb-4">16%</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#212529] font-medium text-lg mb-6 leading-relaxed">
                  of senior professionals actively integrate AI into strategic decision-making
                </p>
                <p className="text-sm text-[#6C757D] font-light">
                  Source: Pew Research Center 2024
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#0A2342] text-white p-16 rounded-lg text-center shadow-2xl">
            <h3 className="text-3xl font-serif font-bold mb-8">
              Strategic AI Leadership: The Competitive Differentiator
            </h3>
            <p className="text-xl leading-relaxed font-light text-gray-200">
              While your peers deliberate, industry leaders are establishing AI-driven competitive advantages 
              that will define market leadership for the next decade.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Presentation */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="bg-[#7ED321] text-white text-lg px-8 py-4 mb-12 rounded-lg font-medium">
              EXECUTIVE DEVELOPMENT PROGRAM
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-12 leading-tight">
              Strategic AI Leadership Framework for Senior Executives
            </h2>
            <p className="text-xl text-[#6C757D] max-w-4xl mx-auto mb-20 leading-relaxed font-light">
              A comprehensive executive development program designed specifically for accomplished professionals 
              who demand strategic depth, practical application, and measurable business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h3 className="text-3xl font-serif font-bold text-[#212529] mb-12">
                Distinguished by Executive Focus
              </h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Strategic Business Context</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      Enterprise-level frameworks presented in boardroom terminology, not technical jargon
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Immediate Implementation</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      Every module designed for direct application within your current organizational context
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Executive Efficiency</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      High-impact learning modules that deliver maximum value within executive time constraints
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#7ED321] rounded-full p-3 mr-6 mt-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#212529] text-xl mb-3">Peer-Level Engagement</h4>
                    <p className="text-[#6C757D] leading-relaxed text-lg font-light">
                      Exclusive cohorts of senior professionals with comparable experience and responsibilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#0A2342] p-12 rounded-lg text-white shadow-2xl">
              <h3 className="text-3xl font-serif font-bold mb-12">Strategic AI Leadership Methodology</h3>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Identify high-impact AI applications for your industry vertical</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <Brain className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Master strategic AI frameworks for organizational transformation</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Implement AI-driven processes within existing operational structures</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-6">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-light">Lead enterprise-wide AI adoption and change management initiatives</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-12">
              Executive Development vs. Technical Training
            </h2>
            <p className="text-xl text-[#6C757D] max-w-4xl mx-auto leading-relaxed font-light">
              Distinguished from technical training programs, our executive development approach addresses 
              the strategic leadership requirements of senior professionals in enterprise environments.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0A2342]">
                    <th className="border border-gray-300 px-8 py-8 text-left font-serif font-bold text-white text-xl">
                      Program Characteristics
                    </th>
                    <th className="border border-gray-300 px-8 py-8 text-center font-serif font-bold text-[#D95D39] text-xl">
                      Executive AI Leadership
                    </th>
                    <th className="border border-gray-300 px-8 py-8 text-center font-serif font-bold text-[#6C757D] text-xl">
                      Technical Training Programs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Target Audience
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Senior executives and strategic leaders</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Technical practitioners and developers</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Content Focus
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Strategic business applications and organizational impact</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Technical implementation and coding fundamentals</p>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Learning Methodology
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Case-based strategic frameworks</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Hands-on technical exercises</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Peer Network
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">C-suite and senior management professionals</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Mixed experience levels and career stages</p>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Executive Support
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Dedicated strategic advisory and implementation guidance</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">General discussion forums and community support</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-300 px-8 py-8 font-semibold text-[#212529] text-lg">
                      Outcome Focus
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-[#7ED321]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Organizational transformation and competitive advantage</p>
                    </td>
                    <td className="border border-gray-300 px-8 py-8 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-6 w-6 text-[#6C757D]" />
                      </div>
                      <p className="font-medium text-[#212529] text-lg">Technical skill acquisition and tool proficiency</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-20">
            <div className="bg-[#0A2342] text-white p-12 rounded-lg shadow-2xl">
              <h3 className="text-3xl font-serif font-bold mb-8">
                Executive Excellence Through Strategic AI Leadership
              </h3>
              <p className="text-xl text-gray-200 mb-12 leading-relaxed font-light">
                While technical training develops operational capabilities, executive development creates 
                strategic leaders who drive organizational transformation and sustainable competitive advantage.
              </p>
              <Button 
                size="lg" 
                className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold px-12 py-6 rounded-lg"
                onClick={openVideoModal}
              >
                Executive Program Details
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-[#0A2342] relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-12 leading-tight">
            Strategic Leadership in the AI Era: Your Competitive Advantage
          </h2>
          <p className="text-xl text-gray-200 mb-16 leading-relaxed font-light">
            The organizations that will dominate the next decade are being led today by executives who understand 
            AI as a strategic imperative, not merely a technological tool.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-12 mb-16">
            <div className="grid md:grid-cols-3 gap-12 text-white">
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-4 mr-6">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Executive Guarantee</p>
                  <p className="text-sm text-gray-300 font-light">30-day strategic value assessment</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-4 mr-6">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Limited Enrollment</p>
                  <p className="text-sm text-gray-300 font-light">Exclusive cohort of 25 senior executives</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-4 mr-6">
                  <Zap className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Immediate Access</p>
                  <p className="text-sm text-gray-300 font-light">Begin strategic transformation today</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Button size="lg" className="bg-[#D95D39] text-white hover:bg-[#C54A2C] font-semibold text-xl px-16 py-8 rounded-lg shadow-2xl transition-all duration-300">
              SECURE EXECUTIVE ENROLLMENT
              <ArrowRight className="ml-4 h-8 w-8" />
            </Button>
            <p className="text-gray-300 text-lg font-light">
              Immediate program access • Executive guarantee • Strategic advisory support
            </p>
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-300 text-xl italic leading-relaxed font-light">
              "The best time to establish strategic advantage was yesterday. The second best time is now."
            </p>
            <p className="text-gray-400 mt-6 text-lg font-light">
              Strategic Leadership Principle
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={closeVideoModal} 
        videoId="1VdpHMKVZvA" 
      />
    </div>
  );
}
