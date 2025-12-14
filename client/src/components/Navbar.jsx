import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, LogOut, User, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated, isStudent, isInstructor } = useAuth();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">LearnHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/courses">
                  <Button variant="ghost">Courses</Button>
                </Link>
                
                {isStudent && (
                  <>
                    <Link to="/student/my-courses">
                      <Button variant="ghost">My Enrollments</Button>
                    </Link>
                    <Link to="/student/ai-recommendations">
                      <Button variant="ghost" className="flex items-center space-x-1">
                        <Sparkles className="h-4 w-4" />
                        <span>AI Recommendations</span>
                      </Button>
                    </Link>
                  </>
                )}
                
                {isInstructor && (
                  <Link to="/instructor/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                )}
                
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.email}</span>
                </div>
                
                <Button variant="destructive" onClick={logout} className="flex items-center space-x-1">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
