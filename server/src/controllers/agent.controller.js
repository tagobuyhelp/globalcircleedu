import { Agent } from "../models/agent.model.js";
import { User } from "../models/user.model.js";
import { Visitor } from "../models/visitor.model.js";
import { Application } from "../models/application.model.js";
import { WithdrawalRequest } from "../models/withdrawalRequest.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const createVisitor = asyncHandler(async (req, res) => {
    const agentId = req.user._id; // Assuming the agent is authenticated
    const visitorData = req.body;

    const visitor = new Visitor({
        ...visitorData,
        createdBy: agentId
    });

    await visitor.save();

    // Update the agent's visitors array
    await Agent.findOneAndUpdate({user: agentId}, { $push: { visitors: visitor._id } });


    res.status(201).json({ success: true, visitor });
});

export const getAgentVisitors = asyncHandler(async (req, res) => {
    const agentUserId = req.user._id;
    const agentId = await Agent.findOne({ user: agentUserId })._id;
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

export const createApplication = asyncHandler(async (req, res) => {
    const { visitorId, services } = req.body;
    const agentUserId = req.user._id;

    // Input validation
    if (!visitorId || !services || !Array.isArray(services) || services.length === 0) {
        throw new ApiError(400, "Invalid input: visitorId and services array are required");
    }

    const agent = await Agent.findOne({ user: agentUserId });
    if (!agent) {
        throw new ApiError(404, "Agent not found");
    }

    const visitor = await Visitor.findOne({ _id: visitorId, createdBy: agent._id });
    if (!visitor) {
        throw new ApiError(404, "Visitor not found or not created by this agent");
    }

    const application = new Application({
        agentId: agent._id,
        visitorId,
        services: services.map(service => ({
            serviceId: service.serviceId,
            status: 'Pending',
            paymentStatus: 'Pending',
            amountPaid: 0,
            commissionAmount: 0
        }))
    });

    await application.save();

    res.status(201).json({ success: true, application });
});

export const getAgentApplications = asyncHandler(async (req, res) => {
    const agentUserId = req.user._id;
    const agentId = await Agent.findOne({ user: agentUserId })._id;
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

export const updateVisitor = asyncHandler(async (req, res) => {
    const { visitorId } = req.params;
    const agentUserId = req.user._id;
    const agentId = await Agent.findOne({ user: agentUserId })._id;

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



// Get application details
export const getApplicationDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const agentUserId = req.user._id; // Assuming the agent is authenticated
    const agentId = await Agent.findOne({ user: agentUserId })._id;

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
    const agentUserId = req.user._id; // Assuming the agent is authenticated
    const agentId = await Agent.findOne({ user: agentUserId })._id;
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
    // Check if req.user exists and has _id
    if (!req.user || !req.user._id) {
        console.error('User not authenticated or missing _id');
        throw new ApiError(401, "User not authenticated");
    }

    const userId = req.user._id;


    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found for ID:', userId);
            throw new ApiError(404, "User not found");
        }

        const agent = await Agent.findOne({ user: userId });
        if (!agent) {
            console.error('Agent not found for email:', user.email);
            throw new ApiError(404, "Agent not found");
        }

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
                ...(stats[0] || { totalApplications: 0, approvedApplications: 0, totalCommission: 0 }),
                totalEarned: agent.totalEarned || 0,
                availableBalance: agent.availableBalance || 0
            }
        });
    } catch (error) {
        console.error('Error in getAgentStats:', error);
        throw new ApiError(500, "Error fetching agent stats: " + error.message);
    }
});

export const requestWithdrawal = asyncHandler(async (req, res) => {
    const agentUserId = req.user._id;
    const agentId = await Agent.findOne({ user: agentUserId })._id;
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
    const agentUserId = req.user._id;

    const agentId = await Agent.findOne({ user: agentUserId })._id;

    const withdrawalRequests = await WithdrawalRequest.find({ agent: agentId });
    res.status(200).json({ success: true, withdrawalRequests });
});

export const createAgent = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
        // If user doesn't exist, create a new user
        user = new User({
            name,
            email,
            phone,
            role: 'agent'
        });
        await user.save();
    } else if (user.role !== 'agent') {
        // If user exists but is not an agent, update their role
        user.role = 'agent';
        await user.save();
    }

    // Check if agent already exists
    let agent = await Agent.findOne({ email });
    if (agent) {
        throw new ApiError(400, "Agent already exists with this email");
    }

    // Create new agent
    agent = new Agent({
        name,
        email,
        phone,
        user: user._id,
        totalBalance: 0,
        commissionEarned: 0,
        totalEarned: 0,
        availableBalance: 0,
        paymentMethod: 'bank_transfer', // default payment method
        paymentDetails: {}
    });

    await agent.save();

    res.status(201).json({
        success: true,
        message: "Agent created successfully",
        agent: {
            id: agent._id,
            name: agent.name,
            email: agent.email,
            phone: agent.phone
        }
    });
});

export const updatePaymentMethod = asyncHandler(async (req, res) => {
    const agentUserId = req.user._id;

    const { paymentMethod, paymentDetails } = req.body;

    const agent = await Agent.findOneAndUpdate(
        {user: agentUserId  },
        { paymentMethod, paymentDetails },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, agent });
});