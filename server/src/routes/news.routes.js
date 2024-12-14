import express from 'express';
import { 
    createNews, 
    getAllNews, 
    getNewsById, 
    updateNews, 
    deleteNews 
} from '../controllers/news.controller.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Create a new news (admin only)
router.post('/news', authorizeRoles('admin'), createNews);

// Get all news
router.get('/news', getAllNews);

// Get a news by ID
router.get('/news/:id', getNewsById);

// Update a news by ID (admin only)
router.put('/news/:id', authorizeRoles('admin'), updateNews);

// Delete a news by ID (admin only)
router.delete('/news/:id', authorizeRoles('admin'), deleteNews);

export default router;
