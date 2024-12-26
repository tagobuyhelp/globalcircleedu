import express from 'express';
import { saveMessage, getMessages } from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/messages', protect, saveMessage);
router.get('/messages/:userId', protect, getMessages);

export default router;