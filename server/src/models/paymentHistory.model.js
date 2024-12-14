import mongoose, { Schema, Types } from 'mongoose';

const paymentHistorySchema = new Schema({
    paymentId: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    invoiceId: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    service: {
        type: String,
        trim: true,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamps: true });

export const PaymentHistory = mongoose.model('PaymentHistory', paymentHistorySchema);
