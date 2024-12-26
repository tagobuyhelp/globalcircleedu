import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);