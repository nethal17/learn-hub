import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Sparkles, BookOpen, Clock, User } from 'lucide-react';

export default function AIRecommendations() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [apiUsage, setApiUsage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter your career goal or learning interest");
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const result = await api.post('/ai/recommend', { prompt });
      setResponse(result.data);
      setApiUsage(result.data.apiUsage);
      
      toast.success("AI recommendations generated successfully");
    } catch (error) {
      console.error('AI Recommendation Error:', error);
      toast.error(error.response?.data?.message || 'Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const examplePrompts = [
    "I want to be a software engineer, what courses should I follow?",
    "I'm interested in becoming a data scientist",
    "I want to learn web development from scratch",
    "Help me become a mobile app developer",
    "I want to learn about artificial intelligence and machine learning"
  ];

  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Course Recommendations
          </h1>
          <p className="text-lg text-gray-600">
            Tell us your career goals and let AI recommend the perfect courses for you
          </p>
          {apiUsage && (
            <p className="text-sm text-gray-500 mt-2">
              API Usage: {apiUsage.current}/{apiUsage.limit} requests used
            </p>
          )}
        </div>

        {/* Input Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What would you like to learn or achieve?
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., I want to be a software engineer, what courses should I follow?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="text-base"
                    disabled={loading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Generating Recommendations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get AI Recommendations
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Example Prompts */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                    disabled={loading}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Response */}
        {response && (
          <div className="space-y-6 animate-fade-in">
            {/* AI Summary Card */}
            <Card className="bg-white border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                  {response.aiResponse ? response.aiResponse.split('\n').slice(0, 2).join(' ') : 'Here are the most relevant courses for your goals.'}
                </div>
              </CardContent>
            </Card>

            {response.recommendedCourses && response.recommendedCourses.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                  Recommended Courses ({response.recommendedCourses.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {response.recommendedCourses.map((course, idx) => (
                    <Card key={course._id} className="hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 80}ms` }}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            {course.level}
                          </span>
                          {course.category && (
                            <span className="text-xs text-gray-500">
                              {course.category}
                            </span>
                          )}
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-gray-600">
                          {course.instructor && (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              <span>{course.instructor.fullName || course.instructor.username}</span>
                            </div>
                          )}
                          {course.duration && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{course.duration}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => handleViewCourse(course._id)}
                          className="w-full"
                        >
                          View Course Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Sparkles className="mx-auto mb-4 h-8 w-8 text-blue-400 animate-bounce" />
                <p>No relevant courses found for your query. Try a different prompt!</p>
              </div>
            )}
            {/* New Search Button */}
            <div className="text-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setPrompt('');
                  setResponse(null);
                }}
              >
                Get New Recommendations
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
