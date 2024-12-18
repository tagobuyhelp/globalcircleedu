import { Agent } from "../models/agent.model.js";
import { Application } from "../models/application.model.js";
import { WithdrawalRequest } from "../models/withdrawalRequest.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

// Create a new application
export const createApplication = asyncHandler(async (req, res) => {
    const { visitorId, serviceId } = req.body;
    const agentId = req.user._id; // Assuming the agent is authenticated

    const application = new Application({
        agentId,
        visitorId,
        serviceId,
        status: 'Pending',
        paymentStatus: 'Pending',
        commissionAmount: 0 // This will be calculated later
    });

    await application.save();

    res.status(201).json({ success: true, application });
});

// Get all applications for an agent
export const getAgentApplications = asyncHandler(async (req, res) => {
    const agentId = req.user._id; // Assuming the agent is authenticated
    const applications = await Application.find({ agentId })
        .populate('visitorId', 'name email')
        .populate('serviceId', 'name');

    res.status(200).json({ success: true, count: applications.length, applications });
});

// Get application details
export const getApplicationDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const agentId = req.user._id; // Assuming the agent is authenticated

    const application = await Application.findOne({ _id: id, agentId })
        .populate('visitorId', 'name email')
        .populate('serviceId', 'name');

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    res.status(200).json({ success: true, application });
});

// Update application (limited fields)
export const updateApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const agentId = req.user._id; // Assuming the agent is authenticated
    const { status } = req.body;

    const application = await Application.findOneAndUpdate(
        { _id: id, agentId },
        { status },
        { new: true, runValidators: true }
    );

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    res.status(200).json({ success: true, application });
});

export const getAgentStats = asyncHandler(async (req, res) => {
    const agentId = req.user._id;
    const agent = await Agent.findById(agentId);
    const stats = await Application.aggregate([
        { $match: { agentId: agent._id } },
        {
            $group: {
                _id: null,
                totalApplications: { $sum: 1 },
                approvedApplications: { $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] } },
                totalCommission: { $sum: "$commissionAmount" }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        stats: {
            ...stats[0],
            totalEarned: agent.totalEarned,
            availableBalance: agent.availableBalance
        }
    });
});

export const requestWithdrawal = asyncHandler(async (req, res) => {
    const agentId = req.user._id;
    const { amount } = req.body;

    const agent = await Agent.findById(agentId);
    if (amount > agent.availableBalance) {
        throw new ApiError(400, "Insufficient balance");
    }

    const withdrawalRequest = new WithdrawalRequest({
        agent: agentId,
        amount,
        paymentMethod: agent.paymentMethod,
        paymentDetails: agent.paymentDetails
    });

    await withdrawalRequest.save();

    agent.availableBalance -= amount;
    await agent.save();

    res.status(201).json({ success: true, withdrawalRequest });
});

export const getWithdrawalRequests = asyncHandler(async (req, res) => {
    const agentId = req.user._id;
    const withdrawalRequests = await WithdrawalRequest.find({ agent: agentId });
    res.status(200).json({ success: true, withdrawalRequests });
});

export const updatePaymentMethod = asyncHandler(async (req, res) => {
    const agentId = req.user._id;
    const { paymentMethod, paymentDetails } = req.body;

    const agent = await Agent.findByIdAndUpdate(
        agentId,
        { paymentMethod, paymentDetails },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, agent });
});