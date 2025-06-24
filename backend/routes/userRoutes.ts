import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateJWT, getProfile);

export default router; 