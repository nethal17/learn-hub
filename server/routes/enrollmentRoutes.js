import express from 'express';
import { protect, isStudent, isInstructor } from '../middleware/auth.js';
import { enroll, getMyEnrollments, getCourseEnrollments, unenroll, checkEnrollment } from '../controllers/enrollmentsController.js';

const router = express.Router();

// @desc    Enroll in a course
router.post('/', protect, isStudent, enroll);

// @desc    Get student's enrolled courses
router.get('/my-enrollments', protect, isStudent, getMyEnrollments);

// @desc    Get enrolled students for a course
router.get('/course/:courseId', protect, isInstructor, getCourseEnrollments);

// @desc    Unenroll from a course
router.delete('/:id', protect, isStudent, unenroll);

// Check if student is enrolled in a course
router.get('/check/:courseId', protect, isStudent, checkEnrollment);

export default router;
