import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadPhotos, getPhotoPath } from '../middleware/photoUpload.middleware.js';
import { 
    createUniversity, 
    getAllUniversities, 
    getUniversityById, 
    updateUniversity, 
    deleteUniversity 
} from '../controllers/university.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllUniversities);
router.get('/:id', getUniversityById);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/', authorize('admin', 'administrator'), uploadPhotos, createUniversity);
router.put('/:id', authorize('admin', 'administrator'), uploadPhotos, updateUniversity);
router.delete('/:id', authorize('admin', 'administrator'), deleteUniversity);

export default router;