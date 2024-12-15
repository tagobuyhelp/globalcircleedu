import express from 'express';
import { 
    createDegree, 
    getAllDegrees, 
    getDegreeById, 
    updateDegree, 
    deleteDegree 
} from '../controllers/degree.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Create a new degree (admin only)
router.post('/create', authorize('admin', 'administrator'), createDegree);

// Get all degrees
router.get('/degrees', getAllDegrees);

// Get a degree by ID
router.get('/degrees/:id', getDegreeById);

// Update a degree by ID (admin only)
router.put('/degrees/:id', authorize('admin', 'administrator'), updateDegree);

// Delete a degree by ID (admin only)
router.delete('/degrees/:id', authorize('admin', 'administrator'), deleteDegree);

export default router;
