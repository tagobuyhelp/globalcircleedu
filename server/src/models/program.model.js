import mongoose, { Schema, Types } from 'mongoose';

const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    duration: {
        type: String, // Example: "3 Years", "6 Months"
        required: true,
    },
    fee: {
        type: Number,
        required: true,
        min: 0,
    },
    degree: {
        type: Types.ObjectId,
        ref: 'Degree', // Links the program to a degree
        required: true,
    },
    university: {
        type: Types.ObjectId,
        ref: 'University', // Links the program to a university
        required: true,
    },
    prerequisites: [{
        type: String, // Admission requirements
        trim: true,
    }],
    availableSeats: {
        type: Number,
        min: 0,
        default: 0,
    },
    applicationDeadline: {
        type: Date,
    },
}, { timestamps: true });

export const Program = mongoose.model('Program', ProgramSchema);
