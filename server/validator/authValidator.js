import { body } from 'express-validator';

export const validateRegistration = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).isAlphanumeric().withMessage('Password must be at least 6 characters and alphanumeric'),
    body('role').isIn(['student', 'instructor']).withMessage('Role must be either student or instructor')
];

export const validateLogin = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];