import express from 'express';
import { protect } from '../middleware/auth.js';
import { register, login, getMe } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../validator/authValidator.js';

const router = express.Router();

// Register a new user
router.post('/register', validateRegistration, register);

// Login user
router.post('/login', validateLogin, login);

// Get current logged in user
router.get('/me', protect, getMe);

export default router;
