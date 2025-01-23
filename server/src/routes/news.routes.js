import express from 'express';
import { 
    createNews, 
    getAllNews, 
    getNewsById, 
    updateNews, 
    deleteNews,
    getRelatedNews 
} from '../controllers/news.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadMixedFiles} from '../middleware/photoUpload.middleware.js';

const router = express.Router();

// Get all news
router.get('/news', getAllNews);

// Get a news by ID
router.get('/news/:id', getNewsById);

// Get related news
router.get('/news/:id/related', getRelatedNews);

// Protected routes
router.use(protect);

// Create a new news (admin only)
router.post('/create', authorize('admin', 'administrator'), uploadMixedFiles, createNews);



// Update a news by ID (admin only)
router.put('/news/:id', authorize('admin', 'administrator'), uploadMixedFiles, updateNews);

// Delete a news by ID (admin only)
router.delete('/news/:id', authorize('admin', 'administrator'), deleteNews);

export default router;
