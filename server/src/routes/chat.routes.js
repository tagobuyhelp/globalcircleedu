import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
    saveVisitorMessage,
    saveAdminMessage,
    getMessagesByVisitor,
    getMessagesByAdmin,
    markMessagesAsRead
} from '../controllers/chat.controller.js';

const router = express.Router();

// Visitor routes
router.post('/visitor', protect, saveVisitorMessage);
router.get('/visitor', protect, getMessagesByVisitor);
router.put('/visitor/read', protect, markMessagesAsRead);

// Admin routes
router.post('/admin', protect, authorize('admin', 'administrator', 'editor'), saveAdminMessage);
router.get('/admin', protect, authorize('admin', 'administrator', 'editor'), getMessagesByAdmin);

export default router;