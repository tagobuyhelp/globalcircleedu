import mongoose, { Schema } from "mongoose";

const feeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Fee name is required"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Fee amount is required"],
        min: [0, "Fee amount cannot be negative"]
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        default: "USD",
        uppercase: true,
        trim: true
    },
    isOptional: {
        type: Boolean,
        default: false
    },
    applicableTo: {
        type: String,
        enum: ['Study Abroad', 'Job Placement', 'Other', 'All'],
        default: 'All'
    },
    effectiveDate: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date
    },
}, { timestamps: true });

// Index for efficient querying
feeSchema.index({ name: 1, applicableTo: 1 });

// Virtual for checking if the fee is currently active
feeSchema.virtual('isActive').get(function() {
    const now = new Date();
    return (!this.expirationDate || this.expirationDate > now) && this.effectiveDate <= now;
});

// Ensure virtuals are included in JSON output
feeSchema.set('toJSON', { virtuals: true });
feeSchema.set('toObject', { virtuals: true });

export const Fee = mongoose.model('Fee', feeSchema);