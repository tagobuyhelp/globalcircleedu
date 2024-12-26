import express from 'express';
import { 
    saveMessage, 
    saveAdminMessage,
    getMessagesBySender, 
    getMessagesByAdmin, 
    markMessagesAsRead 
} from '../controllers/chat.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // Protect all chat routes

// Route for saving a message (for users)
router.post('/send', saveMessage);

// Route for admin to send a message
router.post('/admin/send', authorize('admin'), saveAdminMessage);

// Route for a sender to get their messages
router.get('/sender/:userId', getMessagesBySender);

// Route for admin to get all messages
router.get('/admin', authorize('admin'), getMessagesByAdmin);

// Route for marking messages as read
router.put('/:userId/read', markMessagesAsRead);

export default router;