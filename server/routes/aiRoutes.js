import express from 'express';
import { protect, isStudent} from '../middleware/auth.js';
import { getUsage, recommend } from '../controllers/aiController.js';

const router = express.Router();

// Get current API usage count
router.get('/usage', protect, getUsage);

// Get AI-powered course recommendations
router.post('/recommend', protect, isStudent, recommend);

export default router;
