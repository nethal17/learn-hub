import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to LearnHub
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover thousands of courses, learn from expert instructors, and advance your career with our comprehensive online learning platform.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Wide Range of Courses</h3>
              <p className="text-gray-600">Access hundreds of courses across various subjects</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals and experts</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Certifications</h3>
              <p className="text-gray-600">Earn certificates upon course completion</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
              <p className="text-gray-600">Get personalized course suggestions powered by AI</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-8">Join thousands of students already learning on LearnHub</p>
            <Link to="/register">
              <Button size="lg" variant="secondary">Sign Up Now</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">© 2025 LearnHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
