import mongoose, { Schema, Types } from 'mongoose';

const UniversitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        required: true,
    },
    ranking: {
        type: Number,
        min: 1,
    },
    type: {
        type: String,
        enum: ['Public', 'Private', 'Government'],
        required: true,
    },
    established: {
        type: Date,
    },
    acceptanceRate: {
        type: Number,
        min: 0,
        max: 100,
    },
    numberOfStudents: {
        type: Number,
        min: 0,
    },
    logo: { 
        type: String,
    },
    campusPhotos: [String],
    courses: [{ 
        type: Types.ObjectId, 
        ref: 'Course',
    }],
}, { timestamps: true });

export const University = mongoose.model('University', UniversitySchema);
