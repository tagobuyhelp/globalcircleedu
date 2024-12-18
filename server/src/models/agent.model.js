import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    totalBalance: { type: Number, default: 0 },
    commissionEarned: { type: Number, default: 0 },
    totalEarned: {
        type: Number,
        default: 0
    },
    availableBalance: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        enum: ['bank_transfer', 'paypal', 'stripe'],
    },
    paymentDetails: {
        bankName: String,
        accountNumber: String,
        accountHolderName: String,
        paypalEmail: String,
        stripeAccountId: String
    },
    withdrawRequests: [{
        amount: { type: Number, required: true },
        status: { type: String, enum: ["Pending", "Approved", "Declined"], default: "Pending" },
        requestedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export const Agent = mongoose.model("Agent", agentSchema);
