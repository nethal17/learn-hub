import express from 'express';
import { protect, isInstructor } from '../middleware/auth.js';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse, getMyCourses } from '../controllers/coursesController.js';
import { validateCourseCreation, validateCourseUpdate } from '../validator/courseValidator.js';

const router = express.Router();

// Get all courses
router.get('/', getCourses);

// Get single course
router.get('/:id', getCourse);

// Create a new course
router.post('/', protect, isInstructor, validateCourseCreation, createCourse);

// Update a course
router.put('/:id', protect, isInstructor, validateCourseUpdate, updateCourse);

// Delete a course
router.delete('/:id', protect, isInstructor, deleteCourse);

//Get courses created by logged-in instructor
router.get('/instructor/my-courses', protect, isInstructor, getMyCourses);

export default router;
