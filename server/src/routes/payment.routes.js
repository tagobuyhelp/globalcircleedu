import express from 'express';
import { createPayment, getPaymentHistory, verifyRazorpayPayment } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', protect, createPayment);
router.post('/verify-razorpay', protect, verifyRazorpayPayment);
router.get('/history', protect, getPaymentHistory);

export default router;