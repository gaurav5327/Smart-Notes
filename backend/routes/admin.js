import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getAllUsers, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// GET /api/admin/users
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// DELETE /api/admin/users/:id
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;