import express from 'express';
import { 
    createDegree, 
    getAllDegrees, 
    getDegreeById, 
    updateDegree, 
    deleteDegree 
} from '../controllers/degree.controller.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Create a new degree (admin only)
router.post('/degrees', authorizeRoles('admin'), createDegree);

// Get all degrees
router.get('/degrees', getAllDegrees);

// Get a degree by ID
router.get('/degrees/:id', getDegreeById);

// Update a degree by ID (admin only)
router.put('/degrees/:id', authorizeRoles('admin'), updateDegree);

// Delete a degree by ID (admin only)
router.delete('/degrees/:id', authorizeRoles('admin'), deleteDegree);

export default router;
