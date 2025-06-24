import { Router } from 'express';
import { register, login, getMe, refreshToken, logout, sendOtp, verifyOtp, createGuestUser, updateMe } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { authRateLimiter } from '../middleware/rateLimiter';
const { body } = require('express-validator');

const router = Router();

// Guest user route
router.post('/guest', createGuestUser);

router.post('/register',
  authRateLimiter,
  [
    body('name').isLength({ min: 2 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  register
);

router.post('/login',
  authRateLimiter,
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  login
);

// OTP endpoints
router.post('/send-otp', authRateLimiter, [body('email').isEmail().withMessage('Valid email required')], sendOtp);
router.post('/verify-otp', authRateLimiter, [body('email').isEmail().withMessage('Valid email required'), body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')], verifyOtp);

router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

export default router;
