import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, TrendingUp, Award, Play, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function StudentDashboard() {
  // Mock data - in a real app, this would come from the backend
  const [enrolledCourses] = useState([
    {
      id: 1,
      title: "AI Fundamentals for Professionals",
      progress: 75,
      totalLessons: 4,
      completedLessons: 3,
      lastAccessed: "2 days ago",
      nextLesson: "AI in the Workplace",
      nextLessonId: 4,
    },
    {
      id: 2,
      title: "Machine Learning in Business",
      progress: 25,
      totalLessons: 4,
      completedLessons: 1,
      lastAccessed: "1 week ago",
      nextLesson: "Data Preparation for ML",
      nextLessonId: 6,
    },
  ]);

  const [stats] = useState({
    totalCourses: 2,
    completedCourses: 0,
    totalHours: 20,
    completedHours: 8,
    streak: 5,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome back, Student!
        </h1>
        <p className="text-xl text-gray-600">
          Continue your AI learning journey. You're making great progress!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-[#635BFF] mr-2" />
              <span className="text-2xl font-bold">{stats.totalCourses}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Learning Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-[#635BFF] mr-2" />
              <span className="text-2xl font-bold">{stats.completedHours}</span>
              <span className="text-gray-500 ml-1">/{stats.totalHours}h</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-[#635BFF] mr-2" />
              <span className="text-2xl font-bold">{stats.streak}</span>
              <span className="text-gray-500 ml-1">days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-[#635BFF] mr-2" />
              <span className="text-2xl font-bold">{stats.completedCourses}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-[#635BFF] border-[#635BFF]">
                    In Progress
                  </Badge>
                  <span className="text-sm text-gray-500">{course.lastAccessed}</span>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link to={`/courses/${course.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </Link>
                  <Link to={`/lessons/${course.nextLessonId}`} className="flex-1">
                    <Button className="w-full bg-[#635BFF] hover:bg-[#5048E5]">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                </div>
                
                <p className="text-sm text-gray-600 mt-3">
                  Next: {course.nextLesson}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="font-medium">Completed "Machine Learning Basics"</p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Play className="h-5 w-5 text-[#635BFF] mr-3" />
                <div>
                  <p className="font-medium">Started "Types of AI Systems"</p>
                  <p className="text-sm text-gray-600">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-[#635BFF] mr-3" />
                <div>
                  <p className="font-medium">Enrolled in "AI Fundamentals for Professionals"</p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
