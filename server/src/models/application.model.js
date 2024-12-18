import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Paid'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Partial', 'Completed'],
        default: 'Pending'
    },
    amountPaid: {
        type: Number,
        default: 0
    },
    commissionAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Application = mongoose.model('Application', applicationSchema);