import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Users, Mail, Calendar, User } from 'lucide-react';

export default function CourseStudents() {
  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCourseAndStudents();
    }
  }, [id]);

  const fetchCourseAndStudents = async () => {
    try {
      const [courseResponse, enrollmentResponse] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get(`/enrollments/course/${id}`)
      ]);
      
      setCourse(courseResponse.data.course);
      setEnrollments(enrollmentResponse.data.enrollments);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch data");
      navigate('/instructor/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          ← Back to Dashboard
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{course?.title}</CardTitle>
            <CardDescription>{course?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-semibold">{enrollments.length}</span>
              <span className="ml-1">enrolled students</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrolled Students</CardTitle>
            <CardDescription>View all students enrolled in this course</CardDescription>
          </CardHeader>
          <CardContent>
            {enrollments.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No students enrolled yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Username</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Enrolled Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enrollment) => (
                      <tr key={enrollment._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            {enrollment.student?.fullName || 'N/A'}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {enrollment.student?.username}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center text-gray-700">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            {enrollment.student?.email}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center text-gray-700">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {enrollment.status || 'Active'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
