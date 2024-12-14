import express from 'express';
import { 
    createJob, 
    getAllJobs, 
    getJobById, 
    updateJob, 
    deleteJob 
} from '../controllers/job.controller.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Create a new job (admin only)
router.post('/jobs', authorizeRoles('admin'), createJob);

// Get all jobs
router.get('/jobs', getAllJobs);

// Get a job by ID
router.get('/jobs/:id', getJobById);

// Update a job by ID (admin only)
router.put('/jobs/:id', authorizeRoles('admin'), updateJob);

// Delete a job by ID (admin only)
router.delete('/jobs/:id', authorizeRoles('admin'), deleteJob);

export default router;
