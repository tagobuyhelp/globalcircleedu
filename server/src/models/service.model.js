import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
    name: {
        type: String,
        required: [true, "Service name is required"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: [true, "Service type is required"],
        enum: ['Study Abroad', 'Job Placement', 'Other']
    },
    fees: [{
        type: Schema.Types.ObjectId,
        ref: 'Fee'
    }],
    commissionRate: {
        type: Number,
        required: [true, "Commission rate is required"],
        min: [0, "Commission rate cannot be negative"],
        max: [100, "Commission rate cannot exceed 100"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

// Virtual for calculating total mandatory fees
serviceSchema.virtual('totalMandatoryFees').get(async function() {
    await this.populate('fees');
    return this.fees
        .filter(fee => !fee.isOptional && fee.isActive)
        .reduce((sum, fee) => sum + fee.amount, 0);
});

// Ensure virtuals are included in JSON output
serviceSchema.set('toJSON', { virtuals: true });
serviceSchema.set('toObject', { virtuals: true });

// Index for efficient querying
serviceSchema.index({ name: 1, type: 1 });

export const Service = mongoose.model('Service', serviceSchema);