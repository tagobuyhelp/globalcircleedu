import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
    },
    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    services: [{
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
            default: 0
        }
    }],
    totalAmountPaid: {
        type: Number,
        default: 0
    },
    totalCommissionAmount: {
        type: Number,
        default: 0
    },
    overallStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    adminNotes: {
        type: String,
        default: ''
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Application = mongoose.model('Application', applicationSchema);