import { Router } from 'express';
import { 
    addTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember
} from '../controllers/teamMember.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);

// Protected routes
router.use(protect);

// Admin only routes
router.post('/', authorize('admin', 'administrator' ), upload.single('image'), addTeamMember);
router.patch('/:id', authorize('admin', 'administrator'), upload.single('image'), updateTeamMember);
router.delete('/:id', authorize('admin', 'administrator'), deleteTeamMember);

export default router;