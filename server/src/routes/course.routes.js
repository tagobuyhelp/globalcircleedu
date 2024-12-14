import express from 'express';
import { 
    createCourse, 
    getAllCourses, 
    getCourseById, 
    updateCourse, 
    deleteCourse 
} from '../controllers/course.controller.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Create a new course (admin only)
router.post('/courses', authorizeRoles('admin'), createCourse);

// Get all courses
router.get('/courses', getAllCourses);

// Get a course by ID
router.get('/courses/:id', getCourseById);

// Update a course by ID (admin only)
router.put('/courses/:id', authorizeRoles('admin'), updateCourse);

// Delete a course by ID (admin only)
router.delete('/courses/:id', authorizeRoles('admin'), deleteCourse);

export default router;
