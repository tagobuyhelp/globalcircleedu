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
        enum: ['Study Abroad', 'Job Placement', 'Other', 'All']
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
}, { timestamps: true });

// Method for calculating total mandatory fees
serviceSchema.methods.calculateTotalMandatoryFees = async function() {
    try {
        await this.populate('fees');
        
        if (!this.fees || !Array.isArray(this.fees)) {
            console.warn('Fees not populated or not an array:', this.fees);
            return 0;
        }

        return this.fees
            .filter(fee => fee && !fee.isOptional && fee.isActive)
            .reduce((sum, fee) => sum + (fee.amount || 0), 0);
    } catch (error) {
        console.error('Error calculating totalMandatoryFees:', error);
        return 0;
    }
};

// Ensure virtuals are included in JSON output
serviceSchema.set('toJSON', { virtuals: true });
serviceSchema.set('toObject', { virtuals: true });

// Index for efficient querying
serviceSchema.index({ name: 1, type: 1 });

export const Service = mongoose.model('Service', serviceSchema);