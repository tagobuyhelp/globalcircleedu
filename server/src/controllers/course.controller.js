import { Course } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createCourse = asyncHandler(async (req, res) => {
    const courseData = req.body;
    const course = new Course(courseData);
    await course.save();
    res.status(201).json({ success: true, course });
});

export const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find()
        .populate({
            path: 'program', // Populate the 'program' field
            populate: {
                path: 'degree', // Populate the 'degree' field inside the populated 'program'
            },
        });

    res.status(200).json(courses);
});


export const getCourseById = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findById(courseId)
        .populate({
            path: 'program', // Populate the 'program' field
            populate: {
                path: 'degree', // Populate the 'degree' field inside the populated 'program'
            },
        });
    if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, course });
});

export const updateCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const updateData = req.body;

    const course = await Course.findByIdAndUpdate(
        courseId,
        updateData,
        { new: true, runValidators: true }
    ).populate({
        path: 'program', // Populate the 'program' field
        populate: {
            path: 'degree', // Populate the 'degree' field inside the populated 'program'
        },
    });

    if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, course });
});

export const deleteCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
});
