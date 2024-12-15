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
    .get(authorize('editor', 'admin', 'administrator'), getAllVisitors);

router.route('/stats')
    .get(authorize('admin', 'administrator'), getVisitorStats);

router.route('/:id')
    .get(authorize('editor', 'admin', 'administrator'), getVisitorById)
    .put(authorize('editor', 'admin', 'administrator'), updateVisitor)
    .delete(authorize('admin', 'administrator'), deleteVisitor);

router.route('/bulk')
    .post(authorize('admin', 'administrator'), bulkCreateVisitors);

export default router;
