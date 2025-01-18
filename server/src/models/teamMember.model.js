import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Please provide a role'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Please provide an image']
    },
    expertise: {
        type: String,
        required: [true, 'Please provide an area of expertise'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    }
}, { timestamps: true });

export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);