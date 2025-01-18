import { Router } from 'express';
import { 
    addTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
} from '../controllers/testimonial.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/', authorize('admin', 'administrator'), upload.single('image'), addTestimonial);
router.patch('/:id', authorize('admin', 'administrator'), upload.single('image'), updateTestimonial);
router.delete('/:id', authorize('admin', 'administrator'), deleteTestimonial);

export default router;