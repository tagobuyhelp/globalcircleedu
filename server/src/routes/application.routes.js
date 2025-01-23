import express from 'express';
import { 
    createApplication, 
    getAllApplications, 
    getApplication, 
    updateApplication, 
    deleteApplication 
} from '../controllers/application.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Create application (admin, agent, administrator)
router.post('/', authorize('admin', 'agent', 'administrator'), createApplication);

// Get all applications (admin, administrator)
router.get('/', authorize('admin', 'administrator'), getAllApplications);

// Get single application (admin, agent, administrator)
router.get('/:id', authorize('admin', 'agent', 'administrator'), getApplication);

// Update application (admin, administrator)
router.put('/:id', authorize('admin', 'administrator'), updateApplication);

// Delete application (admin, administrator)
router.delete('/:id', authorize('admin', 'administrator'), deleteApplication);

export default router;