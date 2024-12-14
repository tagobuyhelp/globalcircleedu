import express from 'express';
import { 
    createUniversity, 
    getAllUniversities, 
    getUniversityById, 
    updateUniversity, 
    deleteUniversity 
} from '../controllers/university.controller.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Create a new university (admin only)
router.post('/universities', authorizeRoles('admin'), createUniversity);

// Get all universities
router.get('/universities', getAllUniversities);

// Get a university by ID
router.get('/universities/:id', getUniversityById);

// Update a university by ID (admin only)
router.put('/universities/:id', authorizeRoles('admin'), updateUniversity);

// Delete a university by ID (admin only)
router.delete('/universities/:id', authorizeRoles('admin'), deleteUniversity);

export default router;
