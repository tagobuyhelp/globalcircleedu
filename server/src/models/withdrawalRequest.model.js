import mongoose from "mongoose";

const withdrawalRequestSchema = new mongoose.Schema({
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

export const WithdrawalRequest = mongoose.model('WithdrawalRequest', withdrawalRequestSchema);