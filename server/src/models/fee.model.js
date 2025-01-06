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

feeSchema.virtual('isActive').get(function() {
    const now = new Date();
    return (!this.expirationDate || this.expirationDate > now) && this.effectiveDate <= now;
});

export const Fee = mongoose.model('Fee', feeSchema);