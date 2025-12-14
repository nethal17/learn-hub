import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';

// Enroll in a course
export const enroll = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user.id,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId
    });

    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate('course')
      .populate('student', 'username fullName email');

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in the course!',
      enrollment: populatedEnrollment
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
};

// Get student's enrolled courses
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: 'course',
        populate: {
          path: 'instructor',
          select: 'username fullName email'
        }
      })
      .sort('-enrolledAt');

    res.json({
      success: true,
      count: enrollments.length,
      enrollments
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ message: 'Server error fetching enrollments' });
  }
};

// Get enrolled students for a course
export const getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Verify course exists and belongs to instructor
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view enrollments for this course' });
    }

    // Get enrollments with student details
    const enrollments = await Enrollment.find({ course: courseId })
      .populate('student', 'username fullName email')
      .sort('-enrolledAt');

    res.json({
      success: true,
      count: enrollments.length,
      enrollments
    });
  } catch (error) {
    console.error('Get course enrollments error:', error);
    res.status(500).json({ message: 'Server error fetching course enrollments' });
  }
};

// Unenroll from a course
export const unenroll = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Check if enrollment belongs to the logged-in student
    if (enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to unenroll from this course' });
    }

    await Enrollment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Successfully unenrolled from the course'
    });
  } catch (error) {
    console.error('Unenroll error:', error);
    res.status(500).json({ message: 'Server error during unenrollment' });
  }
};

// Check if student is enrolled in a course
export const checkEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: req.params.courseId
    });

    res.json({
      success: true,
      isEnrolled: !!enrollment,
      enrollment: enrollment || null
    });
  } catch (error) {
    console.error('Check enrollment error:', error);
    res.status(500).json({ message: 'Server error checking enrollment' });
  }
};