import express from 'express';
import { 
    createNews, 
    getAllNews, 
    getNewsById, 
    updateNews, 
    deleteNews 
} from '../controllers/news.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Create a new news (admin only)
router.post('/news', authorize('admin', 'administrator'), createNews);

// Get all news
router.get('/news', getAllNews);

// Get a news by ID
router.get('/news/:id', getNewsById);

// Update a news by ID (admin only)
router.put('/news/:id', authorize('admin', 'administrator'), updateNews);

// Delete a news by ID (admin only)
router.delete('/news/:id', authorize('admin', 'administrator'), deleteNews);

export default router;
