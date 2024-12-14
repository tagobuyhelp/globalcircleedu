import mongoose, { Schema } from 'mongoose';

const invoiceSchema = new Schema({
    invoiceId: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true,
        index: true,
    },
    amountDue: {
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid', 'overdue'],
        default: 'unpaid',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, { timestamps: true });

export const Invoice = mongoose.model('Invoice', invoiceSchema);
