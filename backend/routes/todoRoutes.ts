import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo, archiveTodo } from '../controllers/todoController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateJWT, getTodos);
router.post('/', authenticateJWT, createTodo);
router.put('/:id', authenticateJWT, updateTodo);
router.delete('/:id', authenticateJWT, deleteTodo);
router.patch('/:id/archive', authenticateJWT, archiveTodo);

export default router; 