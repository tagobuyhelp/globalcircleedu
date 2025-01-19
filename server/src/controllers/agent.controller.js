import { Agent } from "../models/agent.model.js";
import { Visitor } from "../models/visitor.model.js";
import { Application } from "../models/application.model.js";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { OtraRequest } from "../models/otraRequest.model.js";
import { WithdrawalRequest } from "../models/withdrawalRequest.model.js";
import { Commission } from "../models/commission.model.js";
import mongoose from 'mongoose';

// Visitor Management
export const createVisitor = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });
    const visitorData = req.body;

    const visitor = new Visitor({
        ...visitorData,
        createdBy: agentId
    });

    await visitor.save();

    await Agent.findByIdAndUpdate(agentId, { $push: { visitors: visitor._id } });

    res.status(201).json({ success: true, visitor });
});

export const getAgentVisitors = asyncHandler(async (req, res) => {
    const agentId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const visitors = await Visitor.find({ createdBy: agentId })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Visitor.countDocuments({ createdBy: agentId });

    res.json({
        success: true,
        visitors,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
    });
});

export const updateVisitor = asyncHandler(async (req, res) => {
    const { visitorId } = req.params;
    const agentId = req.user._id;
    const updateData = req.body;

    const visitor = await Visitor.findOneAndUpdate(
        { _id: visitorId, createdBy: agentId },
        updateData,
        { new: true }
    );

    if (!visitor) {
        throw new ApiError(404, "Visitor not found or not created by this agent");
    }

    res.json({ success: true, visitor });
});

// Application Management
export const createApplication = asyncHandler(async (req, res) => {
    const { visitorId, services } = req.body;
    const agentId = req.user._id;

    const visitor = await Visitor.findOne({ _id: visitorId, createdBy: agentId });
    if (!visitor) {
        throw new ApiError(404, "Visitor not found or not created by this agent");
    }

    const application = new Application({
        agentId,
        visitorId,
        services: services.map(service => ({
            serviceId: service.serviceId,
            status: 'Pending',
            paymentStatus: 'Pending'
        }))
    });

    await application.save();

    res.status(201).json({ success: true, application });
});

export const getAgentApplications = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const applications = await Application.find({ agentId })
        .populate('visitorId')
        .populate('services.serviceId')
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Application.countDocuments({ agentId });

    res.json({
        success: true,
        applications,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
    });
});

export const updateApplication = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });
    const updateData = req.body;

    const application = await Application.findOneAndUpdate(
        { _id: applicationId, agentId },
        updateData,
        { new: true }
    );

    if (!application) {
        throw new ApiError(404, "Application not found or not created by this agent");
    }

    res.json({ success: true, application });
});

// OTRA (One-Time Recovery Amount) Management
export const createOtraRequest = asyncHandler(async (req, res) => {
    const { applicationId, amount, reason } = req.body;
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });

    const application = await Application.findOne({ _id: applicationId, agentId });
    if (!application) {
        throw new ApiError(404, "Application not found or not created by this agent");
    }

    const otraRequest = new OtraRequest({
        agentId,
        applicationId,
        amount,
        reason,
        status: 'Pending'
    });

    await otraRequest.save();

    res.status(201).json({ success: true, otraRequest });
});

// Payment Method Management
export const updatePaymentMethod = asyncHandler(async (req, res) => {
    const agentId = req.user._id;
    const { type, details } = req.body;

    let paymentMethod = await Payment.findOne({ agentId });

    if (paymentMethod) {
        paymentMethod.type = type;
        paymentMethod.details = details;
    } else {
        paymentMethod = new Payment({
            agentId,
            type,
            details
        });
    }

    await paymentMethod.save();

    res.json({ success: true, paymentMethod });
});

export const getPaymentMethod = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });

    const paymentMethod = await Payment.findOne({ agentId });

    if (!paymentMethod) {
        throw new ApiError(404, "Payment method not found");
    }

    res.json({ success: true, paymentMethod });
});

// Agent Statistics and Analytics
export const getAgentStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agentId = await Agent.findOne({user: userId });


    const visitorCount = await Visitor.countDocuments({ createdBy: agentId });
    const applicationCount = await Application.countDocuments({ agentId });

    const applicationStats = await Application.aggregate([
        { $match: { agentId: mongoose.Types.ObjectId(agentId) } },
        {
            $group: {
                _id: null,
                totalApplications: { $sum: 1 },
                approvedApplications: { $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] } },
                pendingApplications: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
                rejectedApplications: { $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] } },
                totalCommission: { $sum: "$commissionAmount" }
            }
        }
    ]);

    const stats = applicationStats[0] || {
        totalApplications: 0,
        approvedApplications: 0,
        pendingApplications: 0,
        rejectedApplications: 0,
        totalCommission: 0
    };

    res.json({
        success: true,
        stats: {
            visitorCount,
            applicationCount,
            ...stats
        }
    });
});

// Get Application Details
export const getApplicationDetails = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });

    const application = await Application.findOne({ _id: applicationId, agentId })
        .populate('visitorId')
        .populate('services.serviceId');

    if (!application) {
        throw new ApiError(404, "Application not found or not created by this agent");
    }

    res.json({ success: true, application });
});

// Request Withdrawal
export const requestWithdrawal = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });
    const { amount, bankDetails } = req.body;

    const agent = await Agent.findById(agentId);
    if (!agent || agent.balance < amount) {
        throw new ApiError(400, "Insufficient balance for withdrawal");
    }

    const withdrawalRequest = new WithdrawalRequest({
        agentId,
        amount,
        bankDetails,
        status: 'Pending'
    });

    await withdrawalRequest.save();

    // Update agent's balance
    agent.balance -= amount;
    await agent.save();

    res.status(201).json({ success: true, withdrawalRequest });
});

// Get Withdrawal Requests
export const getWithdrawalRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const withdrawalRequests = await WithdrawalRequest.find({ agentId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await WithdrawalRequest.countDocuments({ agentId });

    res.json({
        success: true,
        withdrawalRequests,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
    });
});

// Get Agent Commission History
export const getCommissionHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agentId = await Agent.findOne({ user: userId });
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const commissions = await Commission.find({ agentId })
        .populate('applicationId')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Commission.countDocuments({ agentId });

    res.json({
        success: true,
        commissions,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
    });
});