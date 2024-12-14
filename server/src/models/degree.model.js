import mongoose, { Schema } from 'mongoose';

const DegreeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    abbreviation: {
        type: String, // e.g., "B.Sc.", "M.A.", "Ph.D."
        trim: true,
    },
    description: {
        type: String, // Optional additional details about the degree
        trim: true,
    },
}, { timestamps: true });

export const Degree = mongoose.model('Degree', DegreeSchema);
