import express from 'express';
import { getReminders, createReminder, updateReminder, deleteReminder, archiveReminder } from '../controllers/reminderController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateJWT, getReminders);
router.post('/', authenticateJWT, createReminder);
router.put('/:id', authenticateJWT, updateReminder);
router.delete('/:id', authenticateJWT, deleteReminder);
router.patch('/:id/archive', authenticateJWT, archiveReminder);

export default router; 