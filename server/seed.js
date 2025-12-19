import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';

dotenv.config();

// Sample data
const users = [
  // Instructors
  {
    email: 'instructor@gmail.com',
    password: 'password123',
    fullName: 'John Doe',
    role: 'instructor'
  },
  {
    email: 'jane.smith@example.com',
    password: 'password123',
    fullName: 'Jane Smith',
    role: 'instructor'
  },
  {
    email: 'mike.johnson@example.com',
    password: 'password123',
    fullName: 'Mike Johnson',
    role: 'instructor'
  },
  // Students
  {
    email: 'student@gmail.com',
    password: 'password123',
    fullName: 'Alice Williams',
    role: 'student'
  },
  {
    email: 'bob@example.com',
    password: 'password123',
    fullName: 'Bob Brown',
    role: 'student'
  },
  {
    email: 'charlie@example.com',
    password: 'password123',
    fullName: 'Charlie Davis',
    role: 'student'
  },
  {
    email: 'diana@example.com',
    password: 'password123',
    fullName: 'Diana Martinez',
    role: 'student'
  },
  {
    email: 'edward@example.com',
    password: 'password123',
    fullName: 'Edward Wilson',
    role: 'student'
  }
];

const courses = [
      {
        title: 'Flutter Developer Bootcamp',
        description: 'Become a cross-platform mobile app developer using Flutter and Dart. Build beautiful, high-performance apps for iOS and Android.',
        content: `Course Outline:

    Module 1: Introduction to Flutter & Dart
    - Setting up Flutter environment
    - Dart language basics
    - Widgets and layouts

    Module 2: App Development
    - Navigation and routing
    - State management
    - Animations and custom UI

    Module 3: Backend Integration
    - REST APIs
    - Firebase integration
    - Authentication

    Module 4: Deployment
    - Testing and debugging
    - Publishing to app stores
    - Continuous integration

    Module 5: Capstone Project
    - Build and deploy a complete Flutter app`,
        duration: '12 weeks',
        level: 'Intermediate',
        category: 'Mobile Development'
      },
      {
        title: 'Cloud Services with AWS & Azure',
        description: 'Learn the fundamentals of cloud computing and how to deploy, manage, and scale applications using AWS and Azure.',
        content: `Course Outline:

    Module 1: Cloud Computing Basics
    - Cloud models (IaaS, PaaS, SaaS)
    - AWS vs Azure overview
    - Security and compliance

    Module 2: AWS Essentials
    - EC2, S3, Lambda
    - IAM and security groups
    - Deploying web apps

    Module 3: Azure Essentials
    - Azure VMs, Blob Storage
    - Azure Functions
    - Resource management

    Module 4: DevOps in the Cloud
    - CI/CD pipelines
    - Monitoring and scaling
    - Cost optimization

    Module 5: Real-world Project
    - Deploy and manage a cloud-based application`,
        duration: '10 weeks',
        level: 'Intermediate',
        category: 'Cloud Computing'
      },
      {
        title: 'Docker & Kubernetes for Developers',
        description: 'Master containerization and orchestration with Docker and Kubernetes. Learn to build, deploy, and scale modern applications.',
        content: `Course Outline:

    Module 1: Introduction to Containers
    - What is Docker?
    - Images, containers, and registries
    - Docker CLI basics

    Module 2: Building & Managing Containers
    - Dockerfiles
    - Volumes and networks
    - Docker Compose

    Module 3: Kubernetes Fundamentals
    - Pods, deployments, and services
    - ConfigMaps and secrets
    - Scaling and rolling updates

    Module 4: CI/CD & Cloud Integration
    - Kubernetes on AWS/Azure
    - Helm charts
    - Monitoring and logging

    Module 5: Capstone Project
    - Deploy a microservices app with Docker & Kubernetes`,
        duration: '10 weeks',
        level: 'Advanced',
        category: 'DevOps'
      },
    {
      title: 'Data Science with Python (Advanced)',
      description: 'Master advanced data science techniques using Python, including data wrangling, feature engineering, and predictive modeling.',
      content: `Course Outline:

  Module 1: Advanced Pandas & Data Wrangling
  - Data cleaning, merging, reshaping
  - Feature engineering
  - Handling missing data

  Module 2: Statistical Analysis
  - Hypothesis testing
  - Regression analysis
  - Time series analysis

  Module 3: Predictive Modeling
  - Model selection and evaluation
  - Cross-validation
  - Model deployment

  Module 4: Real-world Project
  - End-to-end data science project
  - Model interpretation and reporting`,
      duration: '12 weeks',
      level: 'Advanced',
      category: 'Data Science'
    },
    {
      title: 'Machine Learning Foundations',
      description: 'A comprehensive introduction to machine learning concepts, algorithms, and practical implementation using Python and scikit-learn.',
      content: `Course Outline:

  Module 1: Introduction to Machine Learning
  - Supervised vs unsupervised learning
  - Data preprocessing
  - Feature selection

  Module 2: Core Algorithms
  - Linear regression
  - Logistic regression
  - Decision trees
  - Clustering (K-means, hierarchical)

  Module 3: Model Evaluation
  - Metrics (accuracy, precision, recall, F1)
  - Overfitting and regularization
  - Cross-validation

  Module 4: Hands-on Project
  - Build and evaluate ML models on real datasets`,
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'Machine Learning'
    },
    {
      title: 'Deep Learning & AI Applications',
      description: 'Explore deep learning fundamentals and build AI-powered applications using neural networks, TensorFlow, and Keras.',
      content: `Course Outline:

  Module 1: Neural Networks Basics
  - Perceptrons and activation functions
  - Forward and backward propagation
  - Loss functions

  Module 2: Deep Learning Frameworks
  - Introduction to TensorFlow and Keras
  - Building and training neural networks

  Module 3: Applications
  - Image classification
  - Natural language processing
  - AI-powered web apps

  Module 4: Capstone Project
  - Design and deploy a deep learning solution`,
      duration: '14 weeks',
      level: 'Advanced',
      category: 'Artificial Intelligence'
    },
  {
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners who want to start their journey in web development.',
    content: `Course Outline:
    
Module 1: HTML Basics
- Understanding HTML structure
- Semantic HTML elements
- Forms and input elements
- Best practices for HTML

Module 2: CSS Fundamentals
- CSS selectors and specificity
- Box model and layout
- Flexbox and Grid
- Responsive design principles

Module 3: JavaScript Essentials
- Variables and data types
- Functions and scope
- DOM manipulation
- Event handling

Module 4: Project
- Build a complete responsive website
- Deploy your project online`,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Web Development'
  },
  {
    title: 'Advanced JavaScript and ES6+',
    description: 'Master modern JavaScript features including ES6+ syntax, async programming, and advanced concepts.',
    content: `Course Outline:

Module 1: ES6+ Features
- Arrow functions and template literals
- Destructuring and spread operators
- Modules and imports
- Classes and inheritance

Module 2: Asynchronous JavaScript
- Promises and async/await
- Fetch API and HTTP requests
- Error handling
- Working with APIs

Module 3: Advanced Concepts
- Closures and scope
- Prototypes and inheritance
- Functional programming
- Design patterns

Module 4: Real-world Project
- Build a full-featured web application
- API integration and data management`,
    duration: '6 weeks',
    level: 'Intermediate',
    category: 'Programming'
  },
  {
    title: 'React.js Complete Guide',
    description: 'Comprehensive course on React.js covering hooks, state management, routing, and building modern web applications.',
    content: `Course Outline:

Module 1: React Fundamentals
- Components and JSX
- Props and state
- Event handling
- Conditional rendering

Module 2: React Hooks
- useState and useEffect
- useContext and useReducer
- Custom hooks
- Performance optimization

Module 3: Advanced Topics
- React Router
- State management (Redux/Context)
- API integration
- Form handling and validation

Module 4: Full Stack Project
- Build a complete React application
- Connect to backend APIs
- Authentication and authorization
- Deployment strategies`,
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Web Development'
  },
  {
    title: 'Node.js and Express Backend Development',
    description: 'Learn to build scalable backend applications with Node.js and Express. Covers RESTful APIs, databases, and authentication.',
    content: `Course Outline:

Module 1: Node.js Basics
- Node.js fundamentals
- NPM and package management
- File system operations
- Async programming in Node

Module 2: Express Framework
- Setting up Express server
- Routing and middleware
- Request/Response handling
- Error handling

Module 3: Databases
- MongoDB with Mongoose
- CRUD operations
- Data modeling
- Query optimization

Module 4: Authentication & Security
- JWT authentication
- Password hashing
- API security best practices
- Role-based access control

Module 5: Final Project
- Build a complete REST API
- Implement authentication
- Deploy to production`,
    duration: '8 weeks',
    level: 'Intermediate',
    category: 'Backend Development'
  },
  {
    title: 'Python for Data Science',
    description: 'Comprehensive introduction to Python programming for data analysis, visualization, and machine learning basics.',
    content: `Course Outline:

Module 1: Python Fundamentals
- Python syntax and data types
- Control flow and functions
- Object-oriented programming
- Working with libraries

Module 2: Data Analysis with Pandas
- DataFrames and Series
- Data cleaning and preprocessing
- Data aggregation and grouping
- Working with CSV and Excel files

Module 3: Data Visualization
- Matplotlib basics
- Seaborn for statistical plots
- Interactive visualizations
- Creating dashboards

Module 4: Introduction to Machine Learning
- NumPy for numerical computing
- Scikit-learn basics
- Supervised learning concepts
- Simple ML models

Module 5: Capstone Project
- Complete data analysis project
- Visualize insights
- Present findings`,
    duration: '12 weeks',
    level: 'Beginner',
    category: 'Data Science'
  },
  {
    title: 'Full Stack Web Development Bootcamp',
    description: 'Complete bootcamp covering both frontend and backend development. Build real-world applications from scratch.',
    content: `Course Outline:

Module 1: Frontend Foundation
- HTML, CSS, JavaScript
- Responsive design
- CSS frameworks
- Git and version control

Module 2: Frontend Framework
- React.js deep dive
- Component architecture
- State management
- Routing and navigation

Module 3: Backend Development
- Node.js and Express
- RESTful API design
- Database design
- Authentication systems

Module 4: Advanced Topics
- WebSocket and real-time features
- File uploads and storage
- Payment integration
- Testing and debugging

Module 5: DevOps Basics
- Deployment strategies
- CI/CD pipelines
- Cloud platforms
- Monitoring and scaling

Module 6: Capstone Project
- Build a full-stack application
- Production deployment
- Portfolio presentation`,
    duration: '16 weeks',
    level: 'Advanced',
    category: 'Full Stack'
  },
  {
    title: 'Mobile App Development with React Native',
    description: 'Learn to build cross-platform mobile applications for iOS and Android using React Native.',
    content: `Course Outline:

Module 1: React Native Basics
- Setting up development environment
- Components and styling
- Navigation patterns
- Platform-specific code

Module 2: Mobile UI/UX
- Touch and gestures
- Animations
- Native UI components
- Responsive layouts

Module 3: Device Features
- Camera and photos
- Location services
- Push notifications
- Local storage

Module 4: Backend Integration
- API calls and data fetching
- Authentication flows
- State management
- Offline support

Module 5: Publishing
- App store guidelines
- Building and signing
- Publishing to stores
- App maintenance`,
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Mobile Development'
  },
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design. Learn to create beautiful, functional designs.',
    content: `Course Outline:

Module 1: Design Principles
- Color theory and typography
- Layout and composition
- Visual hierarchy
- Accessibility standards

Module 2: User Research
- User personas
- User journey mapping
- Usability testing
- Gathering feedback

Module 3: Design Tools
- Figma essentials
- Prototyping
- Design systems
- Collaboration tools

Module 4: UI Design
- Creating mockups
- Component libraries
- Responsive design
- Design handoff

Module 5: UX Strategy
- Information architecture
- Wireframing
- Interaction design
- Micro-interactions

Module 6: Portfolio Project
- Complete design project
- Case study creation
- Presentation skills`,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Design'
  },
  {
	  title: 'Database Design and Management',
    description: 'Master database design, SQL, NoSQL, and data modeling. Learn to build efficient, scalable database systems.',
    content: `Course Outline:

Module 1: Database Fundamentals
- Relational vs NoSQL databases
- Database design principles
- Normalization and denormalization
- ER diagrams and data modeling

Module 2: SQL Essentials
- SQL syntax and queries
- Joins and subqueries
- Indexes and performance optimization
- Transactions and ACID properties

Module 3: NoSQL Databases
- MongoDB fundamentals
- Document-based data modeling
- Aggregation pipelines
- Indexing strategies

Module 4: Database Administration
- Backup and recovery
- Security and permissions
- Performance monitoring
- Scaling strategies

Module 5: Advanced Topics
- Database migration
- Replication and clustering
- Caching strategies
- Big data concepts

Module 6: Real-world Project
- Design and implement a complete database system
- Optimize for performance and scalability
- Implement backup and security measures`,
	  duration: '10 weeks',
    level: 'Intermediate',
	  category: 'Database'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log('Existing data cleared');

    // Create users
    console.log('Creating users...');
    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    // Separate instructors and students
    const instructors = createdUsers.filter(user => user.role === 'instructor');
    const students = createdUsers.filter(user => user.role === 'student');

    // Assign instructors to courses
    const coursesWithInstructors = courses.map((course, index) => ({
      ...course,
      instructor: instructors[index % instructors.length]._id
    }));

    // Create courses
    console.log('Creating courses...');
    const createdCourses = await Course.create(coursesWithInstructors);
    console.log(`Created ${createdCourses.length} courses`);

    // Create enrollments (enroll students in random courses)
    console.log('Creating enrollments...');
    const enrollments = [];
    
    students.forEach(student => {
      // Each student enrolls in 2-4 random courses
      const numEnrollments = Math.floor(Math.random() * 3) + 2;
      const shuffledCourses = [...createdCourses].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numEnrollments && i < shuffledCourses.length; i++) {
        enrollments.push({
          student: student._id,
          course: shuffledCourses[i]._id,
          status: 'active',
          progress: Math.floor(Math.random() * 100),
          enrolledAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
        });
      }
    });

    const createdEnrollments = await Enrollment.create(enrollments);
    console.log(`Created ${createdEnrollments.length} enrollments`);

    // Display summary
    console.log('\nDatabase Seeding Summary:');
    console.log('================================');
    console.log(`Users: ${createdUsers.length}`);
    console.log(`   - Instructors: ${instructors.length}`);
    console.log(`   - Students: ${students.length}`);
    console.log(`Courses: ${createdCourses.length}`);
    console.log(`Enrollments: ${createdEnrollments.length}`);
    console.log('================================');
    
    console.log('\nSample Login Credentials:');
    console.log('================================');
    console.log('\nInstructor Accounts:');
    console.log('Email: instructor@gmail.com | Password: password123');
    console.log('Email: jane.smith@example.com | Password: password123');
    console.log('Email: mike.johnson@example.com | Password: password123');
    console.log('\nStudent Accounts:');
    console.log('Email: student@gmail.com | Password: password123');
    console.log('Email: bob@example.com | Password: password123');
    console.log('Email: charlie@example.com | Password: password123');
    console.log('Email: diana@example.com | Password: password123');
    console.log('Email: edward@example.com | Password: password123');
    console.log('================================\n');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
