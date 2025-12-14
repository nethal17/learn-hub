import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { BookOpen, User, Clock, Calendar } from 'lucide-react';

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await api.get('/enrollments/my-enrollments');
      setEnrollments(response.data.enrollments);
    } catch (error) {
      toast.error("Failed to fetch your enrollments");
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Enrolled Courses</h1>
          <p className="text-gray-600 mt-2">View and manage your course enrollments</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your enrollments...</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
            <Button onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <Card key={enrollment._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded">
                      {enrollment.status || 'Active'}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {enrollment.course?.level || 'Beginner'}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{enrollment.course?.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {enrollment.course?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>
                        Instructor: {enrollment.course?.instructor?.fullName || enrollment.course?.instructor?.username}
                      </span>
                    </div>
                    {enrollment.course?.duration && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Duration: {enrollment.course?.duration}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleViewCourse(enrollment.course?._id)}
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
