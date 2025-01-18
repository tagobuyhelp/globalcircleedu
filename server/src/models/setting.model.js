import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    type: {
        type: String,
        enum: ['string', 'number', 'boolean', 'object', 'array'],
        required: true
    },
    description: {
        type: String,
        required: false
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Setting = mongoose.model('Setting', settingSchema);