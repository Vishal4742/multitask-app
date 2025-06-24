import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent, archiveEvent } from '../controllers/eventController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateJWT, getEvents);
router.post('/', authenticateJWT, createEvent);
router.put('/:id', authenticateJWT, updateEvent);
router.delete('/:id', authenticateJWT, deleteEvent);
router.patch('/:id/archive', authenticateJWT, archiveEvent);

export default router; 