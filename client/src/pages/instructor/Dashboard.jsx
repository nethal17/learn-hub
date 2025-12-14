import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { BookOpen, Plus, Edit, Trash2, Users } from 'lucide-react';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const response = await api.get('/courses/instructor/my-courses');
      setCourses(response.data.courses);
    } catch (error) {
      toast.error("Failed to fetch your courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId, courseTitle) => {
    if (!confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
      return;
    }

    try {
      await api.delete(`/courses/${courseId}`);
      toast.success("Course deleted successfully");
      fetchMyCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete course');
    }
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">Manage your courses and view enrolled students</p>
          </div>
          <Button onClick={() => navigate('/instructor/courses/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't created any courses yet</p>
            <Button onClick={() => navigate('/instructor/courses/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Course
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {course.level || 'Beginner'}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(course.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/instructor/courses/${course._id}/students`)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Students
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/instructor/courses/${course._id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteCourse(course._id, course.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
