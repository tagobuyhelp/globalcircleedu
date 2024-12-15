import express from 'express';
import { 
    createUniversity, 
    getAllUniversities, 
    getUniversityById, 
    updateUniversity, 
    deleteUniversity 
} from '../controllers/university.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new university (admin only)
router.post('/universities', authorize('admin', 'administrator'), createUniversity);

// Get all universities
router.get('/universities', getAllUniversities);

// Get a university by ID
router.get('/universities/:id', getUniversityById);

// Update a university by ID (admin only)
router.put('/universities/:id', authorize('admin', 'administrator'), updateUniversity);

// Delete a university by ID (admin only)
router.delete('/universities/:id', authorize('admin', 'administrator'), deleteUniversity);

export default router;
