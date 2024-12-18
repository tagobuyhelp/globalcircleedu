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
        ref: 'Program',
        required: true,
    },
    university: {
        type: Types.ObjectId,
        ref: 'University',
        required: true,
    },
    credits: {
        type: Number,
        required: true,
        min: 0,
    },
    duration: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        trim: true,
    },
    syllabus: {
        type: String,
        trim: true,
    },
    prerequisites: [{
        type: String,
        trim: true,
    }],
    mode: {
        type: String,
        enum: ['Online', 'Offline', 'Hybrid'],
        required: true,
    },
    fee: {
        type: Number,
        min: 0,
    },
}, { timestamps: true });

export const Course = mongoose.model('Course', CourseSchema);