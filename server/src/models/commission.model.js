import mongoose from 'mongoose';

const commissionSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Cancelled'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date
    },
    notes: {
        type: String
    }
}, { timestamps: true });

export const Commission = mongoose.model('Commission', commissionSchema);