import express from 'express';
import { 
    createCourse, 
    getAllCourses, 
    getCourseById, 
    updateCourse, 
    deleteCourse 
} from '../controllers/course.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all courses
router.get('/courses', getAllCourses);

// Get a course by ID
router.get('/courses/:id', getCourseById);

// Protected routes
router.use(protect);


// Create a new course (admin only)
router.post('/create', authorize('admin', 'administrator'), createCourse);

// Update a course by ID (admin only)
router.put('/courses/:id', authorize('admin', 'administrator'), updateCourse);

// Delete a course by ID (admin only)
router.delete('/courses/:id', authorize('admin', 'administrator'), deleteCourse);

export default router;
