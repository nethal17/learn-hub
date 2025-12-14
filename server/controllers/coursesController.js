import { validationResult } from 'express-validator';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'username fullName email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
};

// Get single course
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'username fullName email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error fetching course' });
  }
};

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, content, duration, level, category, thumbnail } = req.body;

    const course = await Course.create({
      title,
      description,
      content,
      instructor: req.user.id,
      duration,
      level,
      category,
      thumbnail
    });

    const populatedCourse = await Course.findById(course._id)
      .populate('instructor', 'username fullName email');

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: populatedCourse
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error creating course' });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the course instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const { title, description, content, duration, level, category, thumbnail } = req.body;

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, content, duration, level, category, thumbnail, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('instructor', 'username fullName email');

    res.json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Server error updating course' });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the course instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    // Delete all enrollments for this course
    await Enrollment.deleteMany({ course: req.params.id });

    // Delete the course
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error deleting course' });
  }
};

// Get courses created by logged-in instructor
export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .populate('instructor', 'username fullName email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error('Get instructor courses error:', error);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
};
