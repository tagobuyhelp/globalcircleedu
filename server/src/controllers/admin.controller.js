import { Application } from "../models/application.model.js";
import { Service } from "../models/service.model.js";
import { WithdrawalRequest } from "../models/withdrawalRequest.model.js";
import { Agent } from "../models/agent.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

// Get all applications (admin view) with pagination
export const getAllApplications = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find()
        .populate('agentId', 'name email')
        .populate('visitorId', 'name email')
        .populate('serviceId', 'name')
        .skip(skip)
        .limit(limit);

    const total = await Application.countDocuments();

    res.status(200).json({
        success: true,
        count: applications.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        applications
    });
});


// Update application status and commission
export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, paymentStatus, amountPaid } = req.body;

    const application = await Application.findById(id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    // Validate input
    if (status && !['Pending', 'Approved', 'Rejected'].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }
    if (paymentStatus && !['Pending', 'Completed'].includes(paymentStatus)) {
        throw new ApiError(400, "Invalid payment status");
    }
    if (amountPaid && amountPaid < 0) {
        throw new ApiError(400, "Amount paid cannot be negative");
    }

    // Update fields
    application.status = status || application.status;
    application.paymentStatus = paymentStatus || application.paymentStatus;
    application.amountPaid = amountPaid || application.amountPaid;

    // Calculate commission if payment is completed
    if (paymentStatus === 'Completed') {
        const service = await Service.findById(application.serviceId);
        if (!service) {
            throw new ApiError(404, "Service not found");
        }
        application.commissionAmount = (service.commissionRate / 100) * application.amountPaid;
    }

    await application.save();

    res.status(200).json({ success: true, application });
});


// Get application statistics
export const getApplicationStats = asyncHandler(async (req, res) => {
    const stats = await Application.aggregate([
        {
            $group: {
                _id: null,
                totalApplications: { $sum: 1 },
                pendingApplications: {
                    $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
                },
                approvedApplications: {
                    $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] }
                },
                rejectedApplications: {
                    $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
                },
                totalAmountPaid: { $sum: "$amountPaid" },
                totalCommission: { $sum: "$commissionAmount" }
            }
        }
    ]);

    res.status(200).json({ success: true, stats: stats[0] || {} });
});


export const getWithdrawalRequests = asyncHandler(async (req, res) => {
    const withdrawalRequests = await WithdrawalRequest.find().populate('agent', 'name email');
    res.status(200).json({ success: true, withdrawalRequests });
});

export const handleWithdrawalRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
        throw new ApiError(400, "Invalid status. Must be 'approved' or 'rejected'");
    }

    const withdrawalRequest = await WithdrawalRequest.findById(id);
    if (!withdrawalRequest) {
        throw new ApiError(404, "Withdrawal request not found");
    }

    withdrawalRequest.status = status;
    await withdrawalRequest.save();

    let message = '';

    if (status === 'approved') {
        message = "The money will be sent to your set payment method within 3 working days.";
    } else if (status === 'rejected') {
        const agent = await Agent.findById(withdrawalRequest.agent);
        if (!agent) {
            throw new ApiError(404, "Agent not found");
        }
        agent.availableBalance += withdrawalRequest.amount;
        await agent.save();
        message = "The withdrawal request has been rejected and the amount has been returned to your available balance.";
    }

    res.status(200).json({ 
        success: true, 
        withdrawalRequest,
        message
    });
});