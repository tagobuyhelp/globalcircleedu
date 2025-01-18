import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    testimonial: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    image: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String
    }
}, { timestamps: true });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);