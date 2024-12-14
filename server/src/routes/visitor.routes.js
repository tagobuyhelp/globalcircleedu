import express from 'express';
import {
    createVisitor,
    getAllVisitors,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
    bulkCreateVisitors,
    getVisitorStats
} from '../controllers/visitor.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/create', createVisitor);

// Protected routes
router.use(protect);

router.route('/')
    .get(authorize('editor', 'admin'), getAllVisitors);

router.route('/stats')
    .get(authorize('admin'), getVisitorStats);

router.route('/:id')
    .get(authorize('editor', 'admin'), getVisitorById)
    .put(authorize('editor', 'admin'), updateVisitor)
    .delete(authorize('admin'), deleteVisitor);

router.route('/bulk')
    .post(authorize('admin'), bulkCreateVisitors);

export default router;