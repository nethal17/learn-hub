import { body } from 'express-validator';

export const validateCourseCreation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('content').trim().notEmpty().withMessage('Content is required')
];

export const validateCourseUpdate = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('content').trim().notEmpty().withMessage('Content is required')
];