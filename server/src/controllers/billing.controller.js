import { asyncHandler } from "../utils/asyncHandler.js";
import { Billing } from '../models/billing.model.js';

export const createBilling = asyncHandler(async (req, res) => {
    const { serviceId, amount, dueDate } = req.body;
    const userId = req.user._id;

    const billing = await Billing.create({
        user: userId,
        service: serviceId,
        amount,
        dueDate
    });

    res.status(201).json({
        success: true,
        data: billing
    });
});

export const getBillingHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const billings = await Billing.find({ user: userId }).populate('service');

    res.status(200).json({
        success: true,
        data: billings
    });
});