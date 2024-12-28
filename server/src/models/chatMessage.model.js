import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isFromAdmin: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);