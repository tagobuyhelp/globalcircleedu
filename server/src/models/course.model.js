import mongoose, { Schema, Types } from 'mongoose';

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    program: {
        type: Types.ObjectId,
        ref: 'Program', // Links the course to a specific program
        required: true,
    },
    credits: {
        type: Number, // Example: 3, 6
        required: true,
        min: 0,
    },
    duration: {
        type: String, // Example: "6 Weeks", "1 Semester"
        required: true,
    },
    instructor: {
        type: String, // Name of the instructor or professor
        trim: true,
    },
    syllabus: {
        type: String, // Path to a syllabus file or description
        trim: true,
    },
    prerequisites: [{
        type: String, // Course-specific requirements
        trim: true,
    }],
    mode: {
        type: String,
        enum: ['Online', 'Offline', 'Hybrid'], // Delivery method
        required: true,
    },
    fee: {
        type: Number,
        min: 0,
    },
}, { timestamps: true });

export const Course = mongoose.model('Course', CourseSchema);
