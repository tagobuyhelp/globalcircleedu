import { Router } from 'express';
import { 
    addTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
} from '../controllers/testimonial.controller.js';
import { uploadSinglePhoto } from '../middleware/photoUpload.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/', authorize('admin', 'administrator'), uploadSinglePhoto, addTestimonial);
router.patch('/:id', authorize('admin', 'administrator'), uploadSinglePhoto, updateTestimonial);
router.delete('/:id', authorize('admin', 'administrator'), deleteTestimonial);

export default router;