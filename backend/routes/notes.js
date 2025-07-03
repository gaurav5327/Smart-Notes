import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { deleteNote } from '../controllers/noteController.js';
import {
    uploadAndSummarize,
    getAllNotes, // ✅ import this
} from '../controllers/noteController.js';

const router = express.Router();

router.get('/', authMiddleware, getAllNotes); // ✅ add this
router.post('/upload', authMiddleware, upload, uploadAndSummarize);

router.delete('/:id', authMiddleware, deleteNote);

export default router;