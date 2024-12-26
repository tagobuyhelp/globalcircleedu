import express from 'express';
import { saveMessage, getMessages, markMessagesAsRead } from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // Protect all chat routes

router.post('/send', saveMessage);
router.get('/:userId', getMessages);
router.put('/:userId/read', markMessagesAsRead);

export default router;