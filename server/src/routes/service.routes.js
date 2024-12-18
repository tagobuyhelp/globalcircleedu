import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} from '../controllers/service.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/', authorize('admin', 'administrator'), createService);
router.put('/:id', authorize('admin', 'administrator'), updateService);
router.delete('/:id', authorize('admin', 'administrator'), deleteService);

export default router;