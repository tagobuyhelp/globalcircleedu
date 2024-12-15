import express from 'express';
import { 
    createJob, 
    getAllJobs, 
    getJobById, 
    updateJob, 
    deleteJob 
} from '../controllers/job.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new job (admin only)
router.post('/jobs', authorize('admin', 'administrator'), createJob);

// Get all jobs
router.get('/jobs', getAllJobs);

// Get a job by ID
router.get('/jobs/:id', getJobById);

// Update a job by ID (admin only)
router.put('/jobs/:id', authorize('admin', 'administrator'), updateJob);

// Delete a job by ID (admin only)
router.delete('/jobs/:id', authorize('admin', 'administrator'), deleteJob);

export default router;
