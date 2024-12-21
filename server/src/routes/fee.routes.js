import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
    createFee,
    getAllFees,
    getFeeById,
    updateFee,
    deleteFee,
    getActiveFees,
    getFeesByApplicability
} from '../controllers/fee.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllFees);
router.get('/active', getActiveFees);
router.get('/:id', getFeeById);
router.get('/applicable/:applicableTo', getFeesByApplicability);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/create', authorize('admin', 'administrator'), createFee);
router.put('/:id', authorize('admin', 'administrator'), updateFee);
router.delete('/:id', authorize('admin', 'administrator'), deleteFee);

export default router;