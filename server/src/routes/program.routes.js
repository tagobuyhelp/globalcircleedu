import express from 'express';
import { 
    createProgram, 
    getAllPrograms, 
    getProgramById, 
    updateProgram, 
    deleteProgram 
} from '../controllers/program.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Create a new program (admin only)
router.post('/create', authorize('admin', 'administrator'), createProgram);

// Get all programs
router.get('/programs', getAllPrograms);

// Get a program by ID
router.get('/programs/:id', getProgramById);

// Update a program by ID (admin only)
router.put('/programs/:id', authorize('admin', 'administrator'), updateProgram);

// Delete a program by ID (admin only)
router.delete('/programs/:id', authorize('admin', 'administrator'), deleteProgram);

export default router;
