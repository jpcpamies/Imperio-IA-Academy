import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Users, TrendingUp, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AdminDashboard() {
  // Mock data - in a real app, this would come from the backend
  const [stats] = useState({
    totalCourses: 4,
    totalStudents: 156,
    totalLessons: 16,
    avgProgress: 68,
  });

  const [courses] = useState([
    {
      id: 1,
      title: "AI Fundamentals for Professionals",
      students: 89,
      lessons: 4,
      status: "published",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      title: "Machine Learning in Business",
      students: 67,
      lessons: 4,
      status: "published",
      lastUpdated: "2024-01-10",
    },
    {
      id: 3,
      title: "Natural Language Processing Essentials",
      students: 45,
      lessons: 4,
      status: "draft",
      lastUpdated: "2024-01-08",
    },
    {
      id: 4,
      title: "AI Ethics and Governance",
      students: 78,
      lessons: 4,
      status: "published",
      lastUpdated: "2024-01-05",
    },
  ]);

  const [recentStudents] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", enrolled: "2024-01-15", progress: 75 },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", enrolled: "2024-01-14", progress: 45 },
    { id: 3, name: "Mike Davis", email: "mike@example.com", enrolled: "2024-01-13", progress: 90 },
    { id: 4, name: "Lisa Wilson", email: "lisa@example.com", enrolled: "2024-01-12", progress: 30 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Manage your AI Academy courses, lessons, and student progress.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Courses</CardTitle>
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
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-[#635BFF] mr-2" />
              <span className="text-2xl font-bold">{stats.totalStudents}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-[#635BFF] mr-2" />
              <span className="text-2xl font-bold">{stats.totalLessons}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-[#635BFF] mr-2" />
              <span className="text-2xl font-bold">{stats.avgProgress}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Management */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
          <Button className="bg-[#635BFF] hover:bg-[#5048E5]">
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Lessons</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>{course.lessons}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Student Activity</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.enrolled}</TableCell>
                    <TableCell>{student.progress}%</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
