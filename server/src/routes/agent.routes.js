import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
    createVisitor,
    getAgentVisitors,
    updateVisitor,
    createApplication,
    getAgentApplications,
    updateApplication,
    createOtraRequest,
    updatePaymentMethod,
    getPaymentMethod,
    getAgentStats,
    getApplicationDetails,
    requestWithdrawal,
    getWithdrawalRequests,
    getCommissionHistory
} from '../controllers/agent.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('agent'));

// Visitor routes
router.route('/visitors')
    .post(createVisitor)
    .get(getAgentVisitors);

router.route('/visitors/:visitorId')
    .put(updateVisitor);

// Application routes
router.route('/applications')
    .post(createApplication)
    .get(getAgentApplications);

router.route('/applications/:id')
    .get(getApplicationDetails)
    .put(updateApplication);

// OTRA request routes
router.route('/otra-requests')
    .post(createOtraRequest);

// Agent stats and profile routes
router.get('/stats', getAgentStats);
router.post('/withdraw', requestWithdrawal);
router.get('/withdrawals', getWithdrawalRequests);
router.route('/payment-method')
    .put(updatePaymentMethod)
    .get(getPaymentMethod);

// Commission routes
router.get('/commissions', getCommissionHistory);

export default router;