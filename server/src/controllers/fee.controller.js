import { Fee } from "../models/fee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new fee
export const createFee = asyncHandler(async (req, res) => {
    const feeData = req.body;
    const fee = new Fee(feeData);
    await fee.save();
    res.status(201).json({ success: true, fee });
});

// Get all fees
export const getAllFees = asyncHandler(async (req, res) => {
    const fees = await Fee.find();
    res.status(200).json({ success: true, count: fees.length, fees });
});

// Get a single fee by ID
export const getFeeById = asyncHandler(async (req, res) => {
    const fee = await Fee.findById(req.params.id);
    if (!fee) {
        return res.status(404).json({ success: false, message: 'Fee not found' });
    }
    res.status(200).json({ success: true, fee });
});

// Update a fee
export const updateFee = asyncHandler(async (req, res) => {
    const feeId = req.params.id;
    const updateData = req.body;

    const fee = await Fee.findByIdAndUpdate(
        feeId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!fee) {
        return res.status(404).json({ success: false, message: 'Fee not found' });
    }

    res.status(200).json({ success: true, fee });
});

// Delete a fee
export const deleteFee = asyncHandler(async (req, res) => {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) {
        return res.status(404).json({ success: false, message: 'Fee not found' });
    }
    res.status(200).json({ success: true, message: 'Fee deleted successfully' });
});

// Get active fees
export const getActiveFees = asyncHandler(async (req, res) => {
    const now = new Date();
    const activeFees = await Fee.find({
        $or: [
            { expirationDate: { $gt: now } },
            { expirationDate: null }
        ],
        effectiveDate: { $lte: now }
    });
    res.status(200).json({ success: true, count: activeFees.length, fees: activeFees });
});

// Get fees by applicability
export const getFeesByApplicability = asyncHandler(async (req, res) => {
    const { applicableTo } = req.params;
    const fees = await Fee.find({ applicableTo: applicableTo });
    res.status(200).json({ success: true, count: fees.length, fees });
});