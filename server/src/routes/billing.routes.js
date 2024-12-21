import express from 'express';
import { createBilling, getBillingHistory } from '../controllers/billing.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', protect, authorize('admin'), createBilling);
router.get('/history', protect, getBillingHistory);

export default router;