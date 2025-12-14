# Online Learning Platform - LearnHub

A full-stack online learning platform built with the MERN stack (MongoDB, Express.js, React with Vite, Node.js) featuring JWT authentication, role-based access control, course management, student enrollment functionality and AI-Powered course recommendations.

## Features

### Student Features
- User registration and login with JWT authentication
- Browse available courses with detailed information
- View course details including instructor, duration, and content
- Enroll in courses
- View enrolled courses dashboard
- **AI-Powered Course Recommendations** - Get personalized course suggestions using GPT-3
- Success messages upon enrollment

### Instructor Features
- User registration and login with JWT authentication
- Create, Read, Update, and Delete (CRUD) courses
- View all posted courses
- Edit course details
- View enrolled students for each course
- Display enrolled students in a table format with details

### Security & Authentication
- JWT-based authentication for secure access
- Role-based access control (RBAC) for Students and Instructors
- Protected routes ensuring only authenticated users can access features
- Password hashing with bcryptjs

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **OpenAI** - GPT-3 integration for AI recommendations
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **Vite** - Build tool and dev server
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Axios** - HTTP client
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/learning-platform
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

6. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Update the `.env.local` file:
```env
VITE_API_URL=http://localhost:5001/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5147`

### Database Seeding

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This creates:
- 3 instructors with courses
- 5 students
- Sample enrollments

**Test credentials:**
- Instructor: instructor1@test.com / password123
- Student: student1@test.com / password123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Courses
- `GET /api/courses` - Get all courses (Public)
- `GET /api/courses/:id` - Get single course (Public)
- `POST /api/courses` - Create course (Instructor only)
- `PUT /api/courses/:id` - Update course (Instructor only)
- `DELETE /api/courses/:id` - Delete course (Instructor only)
- `GET /api/courses/instructor/my-courses` - Get instructor's courses (Instructor only)

### Enrollments
- `POST /api/enrollments` - Enroll in course (Student only)
- `GET /api/enrollments/my-enrollments` - Get student enrollments (Student only)
- `GET /api/enrollments/course/:courseId` - Get course enrollments (Instructor only)
- `GET /api/enrollments/check/:courseId` - Check enrollment status (Student only)
- `DELETE /api/enrollments/:id` - Unenroll from course (Student only)

### AI Recommendations
- `POST /api/ai/recommend` - Get AI-powered course recommendations (Student only)
- `GET /api/ai/usage` - Get API usage statistics (Protected)

## AI-Powered Features

### Course Recommendations
Students can get personalized course recommendations powered by GPT-3:
- Enter career goals like "I want to be a software engineer"
- Receive 3-5 most relevant course recommendations
- Get detailed explanations for why each course is recommended
- View and enroll in recommended courses directly

**API Usage Tracking:**
- Maximum 250 API requests per server session
- Real-time usage counter displayed to users
- Graceful error handling when limit is reached

**Example Prompts:**
- "I want to be a software engineer, what courses should I follow?"
- "I'm interested in becoming a data scientist"
- "I want to learn web development from scratch"

For detailed AI integration documentation, see [AI_INTEGRATION.md](AI_INTEGRATION.md)

## UI Components

The application uses **Radix UI** components styled with **Tailwind CSS**:
- Button
- Card
- Input
- Label
- Toast (for notifications)
- All components are fully accessible and customizable

## Security Features

1. **Password Security**
   - Passwords are hashed using bcryptjs with salt rounds
   - Passwords never stored in plain text

2. **JWT Authentication**
   - Secure token-based authentication
   - Tokens expire after 30 days
   - Tokens stored in localStorage

3. **Role-Based Access Control**
   - Middleware validates user roles
   - Protected routes enforce authorization
   - API endpoints secured based on user role

4. **Input Validation**
   - Server-side validation using express-validator
   - Client-side form validation
   - Protection against common attacks

## Additional Resources

- [React.js Documentation](https://react.dev/learn)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)