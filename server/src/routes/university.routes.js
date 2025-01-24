import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadMixedFiles } from '../middleware/photoUpload.middleware.js';
import {
    createUniversity,
    getAllUniversities,
    getUniversityById,
    updateUniversity,
    deleteUniversity
} from '../controllers/university.controller.js';

const router = express.Router();

// Get all universities (paginated)
router.get('/', getAllUniversities);

// Protected routes
router.use(protect);

// Create a new university
router.post('/', authorize('admin', 'administrator'), uploadMixedFiles, createUniversity);



// Get a specific university by ID
router.get('/:id', getUniversityById);

// Update a university
router.put('/:id', uploadMixedFiles, updateUniversity);

// Delete a university
router.delete('/:id', authorize('admin', 'administrator'), deleteUniversity);

export default router;