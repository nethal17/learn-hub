import { body } from 'express-validator';

export const validateCourseCreation = [
    body('title').trim().notEmpty().isLength({ max: 100 }).withMessage('Title is required and less than 100 characters'),
    body('description').trim().notEmpty().isLength({ max: 1000 }).withMessage('Description is required and less than 1000 characters'),
    body('content').trim().notEmpty().withMessage('Content is required')
];

export const validateCourseUpdate = [
    body('title').trim().notEmpty().isLength({ max: 100 }).withMessage('Title is required and less than 100 characters'),
    body('description').trim().notEmpty().isLength({ max: 1000 }).withMessage('Description is required and less than 1000 characters'),
    body('content').trim().notEmpty().withMessage('Content is required')
];