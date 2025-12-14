import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'

import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import AIRecommendations from './pages/student/AIRecommendations'
import InstructorDashboard from './pages/instructor/Dashboard'
import CreateCourse from './pages/instructor/CreateCourse'
import EditCourse from './pages/instructor/EditCourse'
import CourseStudents from './pages/instructor/CourseStudents'

// Protected Route Component
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        
        {/* Student Routes */}
        <Route 
          path="/student/my-courses" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MyEnrollments />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/ai-recommendations" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <AIRecommendations />
            </ProtectedRoute>
          } 
        />
        
        {/* Instructor Routes */}
        <Route 
          path="/instructor/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <InstructorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/instructor/courses/create" 
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <CreateCourse />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/instructor/courses/:id/edit" 
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <EditCourse />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/instructor/courses/:id/students" 
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <CourseStudents />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App;
