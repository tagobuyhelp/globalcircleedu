import { Agent } from "../models/agent.model.js";
import { Visitor } from "../models/visitor.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { OtraRequest } from "../models/otraRequest.model.js";
import { WithdrawalRequest } from "../models/withdrawalRequest.model.js";
import { Commission } from "../models/commission.model.js";
import { generateRandomPassword } from "../utils/passwordUtils.js";
import { notifyAdmins, notifyUser } from "../utils/sendEmail.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Visitor Management
export const createVisitor = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agent = await Agent.findOne({user: userId});
    const agentId = agent?._id;
    if (!agent) {
        throw new ApiError(404, "Agent not found");
    }

    const visitorData = req.body;
    const { name, phone, email } = visitorData;

    // Check if a user with this email already exists
    let user = await User.findOne({ email });
    if (user) {
        throw new ApiError(400, "A user with this email already exists");
    }

    // Handle file uploads
    const profilePicture = req.files?.profilePicture?.[0];
    const identityDocument = req.files?.['documents.identityDocument']?.[0];
    const transcript = req.files?.['documents.transcript']?.[0];
    const workExperience = req.files?.['documents.workExperience']?.[0];
    const languageTests = req.files?.['documents.languageTests']?.[0];

    // Upload files to Cloudinary
    const profilePictureResult = profilePicture ? await uploadToCloudinary(profilePicture) : null;
    const identityDocumentResult = identityDocument ? await uploadToCloudinary(identityDocument) : null;
    const transcriptResult = transcript ? await uploadToCloudinary(transcript) : null;
    const workExperienceResult = workExperience ? await uploadToCloudinary(workExperience) : null;
    const languageTestsResult = languageTests ? await uploadToCloudinary(languageTests) : null;

    

    // Generate a random password
    const password = generateRandomPassword();

    // Create a new user
    user = new User({
        name,
        phone,
        email,
        password,
        role: 'visitor'
    });
    await user.save();

    // Prepare visitor data with uploaded file URLs
    const visitorDataWithFiles = {
        ...visitorData,
        user: user._id,
        createdBy: agentId,
        profilePicture: profilePictureResult?.secure_url || null,
        documents: {
            identityDocument: {
                name: "Identity Document",
                fileURL: identityDocumentResult?.secure_url || null,
                documentType: "PDF",
            },
            transcript: {
                name: "Transcript of Previous Degree",
                fileURL: transcriptResult?.secure_url || null,
                documentType: "PDF",
            },
            workExperience: {
                name: "Work Experience/Job Letter",
                fileURL: workExperienceResult?.secure_url || null,
                documentType: "PDF",
            },
            languageTests: {
                name: "Language/Other Tests",
                fileURL: languageTestsResult?.secure_url || null,
                documentType: "PDF",
            },
        },
    };

    // Create a new visitor
    const visitor = new Visitor(visitorDataWithFiles);
    await visitor.save();

    // Update agent's visitors array
    await Agent.findByIdAndUpdate(agentId, { $push: { visitors: visitor._id } });

    // Notify admins
    await notifyAdmins({
        subject: "New Visitor Registration",
        text: `A new visitor has been registered by agent ${agent.name}. Visitor details: ${visitor.name}, ${visitor.email}`,
        html: `
            <h1>New Visitor Registration</h1>
            <p>A new visitor has been registered by agent ${agent.name}.</p>
            <p>Visitor details:</p>
            <ul>
                <li>Name: ${visitor.name}</li>
                <li>Email: ${visitor.email}</li>
            </ul>
        `
    });

    // Notify agent
    await notifyUser({
        to: agent.email,
        subject: "New Visitor Registered",
        text: `You have successfully registered a new visitor: ${visitor.name}, ${visitor.email}`,
        html: `
            <h1>New Visitor Registered</h1>
            <p>You have successfully registered a new visitor:</p>
            <ul>
                <li>Name: ${visitor.name}</li>
                <li>Email: ${visitor.email}</li>
            </ul>
        `
    });

    // Notify visitor
    await notifyUser({
        to: email,
        subject: "Welcome to Global Circle Edu",
        text: `Welcome to Global Circle Edu! Your account has been created. Your temporary password is: ${password}. Please change it upon your first login.`,
        html: `
            <h1>Welcome to Global Circle Edu!</h1>
            <p>Your account has been created.</p>
            <p>Your temporary password is: <strong>${password}</strong></p>
            <p>Please change it upon your first login.</p>
        `
    });

    res.status(201).json({ 
        success: true, 
        message: "Visitor created successfully",
        visitor: {
            _id: visitor._id,
            name: visitor.name,
            email: visitor.email
        }
    });
});

export const getAgentVisitors = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agent = await Agent.findOne({user: userId})
    const agentId = agent?._id;


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
    const userId = req.user._id;
    const agent = await Agent.findOne({ user: userId});
    const agentId = agent?._id;
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
    const userId = req.user._id;
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;
    

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
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;
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
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;
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
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;

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
    const userId = req.user._id;
    const { paymentMethod, paymentDetails } = req.body;

    const agent = await Agent.findOneAndUpdate(
        { user: userId },
        { paymentMethod, paymentDetails },
        { new: true, runValidators: true }
    );

    if (!agent) {
        throw new ApiError(404, "Agent not found");
    }

    res.json({
        success: true,
        message: "Payment method updated successfully",
        paymentMethod: agent.paymentMethod,
        paymentDetails: agent.paymentDetails
    });
});

export const getPaymentMethod = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;

    const paymentMethod = await Payment.findOne({ agentId });

    if (!paymentMethod) {
        throw new ApiError(404, "Payment method not found");
    }

    res.json({ success: true, paymentMethod });
});


// Agent Statistics and Analytics
export const getAgentStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agent = await Agent.findOne({ user: userId });

    if (!agent) {
        throw new ApiError(404, "Agent not found");
    }

    const visitorCount = await Visitor.countDocuments({ _id: { $in: agent.visitors } });
    const applicationCount = await Application.countDocuments({ agentId: agent._id });

    const applicationStats = await Application.aggregate([
        { $match: { agentId: agent._id } },
        {
            $group: {
                _id: null,
                totalApplications: { $sum: 1 },
                approvedApplications: { $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] } },
                pendingApplications: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
                rejectedApplications: { $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] } }
            }
        }
    ]);

    const stats = applicationStats[0] || {
        totalApplications: 0,
        approvedApplications: 0,
        pendingApplications: 0,
        rejectedApplications: 0
    };

    res.json({
        success: true,
        stats: {
            visitorCount,
            applicationCount,
            ...stats,
            totalBalance: agent.totalBalance,
            availableBalance: agent.availableBalance,
            commissionEarned: agent.commissionEarned,
            totalEarned: agent.totalEarned
        }
    });
});

// Get Application Details
export const getApplicationDetails = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const userId = req.user._id;
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;

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
    const { amount } = req.body;

    const agent = await Agent.findOne({ user: userId });

    if (!agent) {
        throw new ApiError(404, "Agent not found");
    }

    if (amount > agent.availableBalance) {
        throw new ApiError(400, "Insufficient balance");
    }

    agent.withdrawRequests.push({
        amount,
        status: "Pending",
        requestedAt: new Date()
    });

    agent.availableBalance -= amount;

    await agent.save();

    res.json({
        success: true,
        message: "Withdrawal request submitted successfully",
        withdrawalRequest: agent.withdrawRequests[agent.withdrawRequests.length - 1]
    });
});

// Get Withdrawal Requests
export const getWithdrawalRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;
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
    const agent = await Agent.findOne({ user: userId });
    const agentId = agent?._id;
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