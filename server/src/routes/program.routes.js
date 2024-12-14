import express from 'express';
import { 
    createProgram, 
    getAllPrograms, 
    getProgramById, 
    updateProgram, 
    deleteProgram 
} from '../controllers/program.controller.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Create a new program (admin only)
router.post('/programs', authorizeRoles('admin'), createProgram);

// Get all programs
router.get('/programs', getAllPrograms);

// Get a program by ID
router.get('/programs/:id', getProgramById);

// Update a program by ID (admin only)
router.put('/programs/:id', authorizeRoles('admin'), updateProgram);

// Delete a program by ID (admin only)
router.delete('/programs/:id', authorizeRoles('admin'), deleteProgram);

export default router;
