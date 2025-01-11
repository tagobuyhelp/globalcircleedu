import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
    createVisitor,
    getAgentVisitors,
    createApplication,
    getAgentApplications,
    getApplicationDetails,
    updateApplication,
    updateVisitor,
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

router.route('/visitors')
    .post(createVisitor)
    .get(getAgentVisitors);

router.route('/visitors/visitorId', updateVisitor);

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