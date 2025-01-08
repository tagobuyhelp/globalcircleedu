import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
    createApplication,
    getAgentApplications,
    getApplicationDetails,
    updateApplication,
    getAgentStats,
    requestWithdrawal,
    getWithdrawalRequests,
    updatePaymentMethod,
    createAgent,
} from '../controllers/agent.controller.js';

const router = express.Router();

router.post('/create', createAgent);

// Protect all routes
router.use(protect);
router.use(authorize('agent'));

router.route('/applications')
    .post(createApplication)
    .get(getAgentApplications);

router.route('/applications/:id')
    .get(getApplicationDetails)
    .put(updateApplication);

router.get('/stats', getAgentStats);
router.post('/withdraw', requestWithdrawal);
router.get('/withdrawals', getWithdrawalRequests);
router.put('/payment-method', updatePaymentMethod);

export default router;