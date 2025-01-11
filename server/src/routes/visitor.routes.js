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
import { uploadPhotos } from '../middleware/photoUpload.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred', details: err.message });
};

// Public routes
router.post('/create', uploadPhotos, createVisitor);

// Protected routes
router.use(protect);

router.route('/')
    .get(authorize('editor', 'admin', 'administrator', 'visitor'), (req, res, next) => {
        console.log('Accessing getAllVisitors route');
        getAllVisitors(req, res, next);
    });

router.route('/stats')
    .get(authorize('admin', 'administrator'), (req, res, next) => {
        console.log('Accessing getVisitorStats route');
        getVisitorStats(req, res, next);
    });

router.route('/:id')
    .get(authorize('editor', 'admin', 'administrator', 'visitor'), getVisitorById)
    .put(authorize('editor', 'admin', 'administrator', 'visitor'), updateVisitor)
    .delete(authorize('admin', 'administrator'), deleteVisitor);

router.route('/bulk')
    .post(authorize('admin', 'administrator'), bulkCreateVisitors);

// Apply error handling middleware
router.use(errorHandler);

export default router;