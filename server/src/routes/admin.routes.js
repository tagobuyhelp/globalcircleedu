import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
    getAllApplications,
    updateApplicationStatus,
    getApplicationStats,
    getWithdrawalRequests,
    handleWithdrawalRequest
} from '../controllers/admin.controller.js';

const router = express.Router();

// Protect all routes and ensure admin access
router.use(protect);
router.use(authorize('admin', 'administrator'));

router.route('/applications')
    .get(getAllApplications);

router.route('/applications/:id')
    .put(updateApplicationStatus);

router.route('/applications/stats')
    .get(getApplicationStats);

router.get('/withdrawals', getWithdrawalRequests);
router.put('/withdrawals/:id', handleWithdrawalRequest);

export default router;