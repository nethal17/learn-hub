import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { BookOpen, User, Clock, CheckCircle } from 'lucide-react';

export default function CourseDetails() {
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isStudent } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCourse();
      if (isStudent) {
        checkEnrollment();
      }
    }
  }, [id, isStudent]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data.course);
    } catch (error) {
      toast.error("Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await api.get(`/enrollments/check/${id}`);
      setIsEnrolled(response.data.isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to enroll in courses");
      navigate('/login');
      return;
    }

    if (!isStudent) {
      toast.error("Only students can enroll in courses");
      return;
    }

    setEnrolling(true);

    try {
      const response = await api.post('/enrollments', { courseId: id });
      toast.success(response.data.message);
      setIsEnrolled(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          ← Back to Courses
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded">
                {course.level || 'Beginner'}
              </span>
              {isEnrolled && (
                <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Enrolled
                </span>
              )}
            </div>
            <CardTitle className="text-3xl">{course.title}</CardTitle>
            <CardDescription className="text-base mt-3">
              {course.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Instructor</p>
                  <p className="font-medium">{course.instructor?.fullName || course.instructor?.username}</p>
                </div>
              </div>
              {course.duration && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-medium">{course.duration}</p>
                  </div>
                </div>
              )}
              {course.category && (
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium">{course.category}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Course Content</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{course.content}</p>
              </div>
            </div>

            {isStudent && !isEnrolled && (
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? 'Enrolling...' : 'Enroll in This Course'}
                </Button>
              </div>
            )}

            {isStudent && isEnrolled && (
              <div className="pt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">You are enrolled in this course!</p>
                  <p className="text-green-700 text-sm mt-1">Continue learning and complete the course content.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
