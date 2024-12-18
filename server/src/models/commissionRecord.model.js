const commissionRecordSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
    commissionAmount: { type: Number, required: true },
    earnedAt: { type: Date, default: Date.now }
});

export const CommissionRecord = mongoose.model("CommissionRecord", commissionRecordSchema);
