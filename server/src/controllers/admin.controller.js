import { Application } from "../models/application.model.js";
import { Service } from "../models/service.model.js";
import { WithdrawalRequest } from "../models/withdrawalRequest.model.js";
import { Agent } from "../models/agent.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const createApplication = asyncHandler(async (req, res) => {
    const { agentId, visitorId, services, adminNotes } = req.body;

    if (!visitorId || !services || services.length === 0) {
        throw new ApiError(400, "Visitor ID and at least one service are required");
    }

    const application = new Application({
        agentId,
        visitorId,
        services: services.map(service => ({
            serviceId: service.serviceId,
            status: service.status || 'Pending',
            paymentStatus: service.paymentStatus || 'Pending',
            amountPaid: service.amountPaid || 0,
            commissionAmount: 0 // This will be calculated later
        })),
        adminNotes,
        createdBy: req.user._id
    });

    // Calculate totals
    application.totalAmountPaid = application.services.reduce((total, service) => total + service.amountPaid, 0);
    application.totalCommissionAmount = 0; // This will be calculated later when commissions are determined

    await application.save();

    // Populate the services information
    await application.populate('services.serviceId');

    res.status(201).json({
        success: true,
        application: application
    });
});

export const getAllApplications = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};
    if (req.query.status) filter['services.status'] = req.query.status;
    if (req.query.paymentStatus) filter['services.paymentStatus'] = req.query.paymentStatus;
    if (req.query.serviceId) filter['services.serviceId'] = req.query.serviceId;

    if (req.query.startDate && req.query.endDate) {
        filter.createdAt = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate)
        };
    }

    // Sorting
    const sort = req.query.sortBy
        ? { [req.query.sortBy.split(':')[0]]: req.query.sortBy.split(':')[1] === 'desc' ? -1 : 1 }
        : { createdAt: -1 };

    // Search
    if (req.query.search) {
        filter.$or = [
            { 'agentId.name': { $regex: req.query.search, $options: 'i' } },
            { 'visitorId.name': { $regex: req.query.search, $options: 'i' } },
            { 'services.serviceId.name': { $regex: req.query.search, $options: 'i' } }
        ];
    }

    const applications = await Application.find(filter)
    .populate('agentId', 'name email')
    .populate('visitorId', 'name email')
    .populate({
        path: 'services.serviceId',
        select: 'name fees',
        populate: {
            path: 'fees',
            select: 'name amount isOptional'
        }
    })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

const total = await Application.countDocuments(filter);

// Additional calculations
let totalServiceFeesDue = 0;
let totalAmountPaid = 0;
let totalCommissionAmount = 0;
let pendingServices = 0;
let approvedApplications = 0;
let rejectedApplications = 0;

for (const application of applications) {
    let applicationTotalFees = 0;
    let applicationAmountPaid = 0;
    let applicationCommissionAmount = 0;

    for (const service of application.services) {
        const mandatoryFees = service.serviceId.fees
            .filter(fee => !fee.isOptional)
            .reduce((sum, fee) => sum + fee.amount, 0);
        applicationTotalFees += mandatoryFees;
        applicationAmountPaid += service.amountPaid || 0;
        applicationCommissionAmount += service.commissionAmount || 0;

        // Count application statuses
        if (service.status === 'Pending') pendingServices++;
        else if (service.status === 'Approved') approvedApplications++;
        else if (service.status === 'Rejected') rejectedApplications++;
    }

    totalServiceFeesDue += applicationTotalFees;
    totalAmountPaid += applicationAmountPaid;
    totalCommissionAmount += applicationCommissionAmount;

    // Add these fields to each application object
    application.totalServiceFeesDue = applicationTotalFees;
    application.totalAmountPaid = applicationAmountPaid;
    application.totalCommissionAmount = applicationCommissionAmount;
    application.amountDue = Math.max(applicationTotalFees - applicationAmountPaid, 0);
}

const stats = {
    serviceStats: {
        totalApplications: applications.length,
        totalAmountPaid,
        totalCommission: totalCommissionAmount,
        pendingServices,
        approvedApplications,
        rejectedApplications
    },
    additionalStats: {
        totalServiceFeesDue,
        totalAmountPaid,
        totalCommissionAmount,
        totalAmountDue: Math.max(totalServiceFeesDue - totalAmountPaid, 0)
    }
};

res.status(200).json({
    success: true,
    count: applications.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    applications,
    stats
});
});

// Helper function to prepare application update
const prepareApplicationUpdate = async (application, updates) => {
    const { status, paymentStatus, amountPaid, adminNotes } = updates;

    // Update fields if provided
    if (status) application.status = status;
    if (paymentStatus) application.paymentStatus = paymentStatus;
    if (amountPaid !== undefined) application.amountPaid = amountPaid;
    if (adminNotes) application.adminNotes = adminNotes;

    // Calculate commission if payment is completed or partial
    if (paymentStatus === 'Completed' || (paymentStatus === 'Partial' && amountPaid > 0)) {
        if (!application.serviceId) {
            throw new ApiError(404, "Service not found for this application");
        }

        // Calculate total mandatory fees
        const totalMandatoryFees = await application.serviceId.calculateTotalMandatoryFees();

        // Calculate commission based on the amount paid minus mandatory fees
        const commissionableAmount = Math.max(application.amountPaid - totalMandatoryFees, 0);
        application.commissionAmount = (application.serviceId.commissionRate / 100) * commissionableAmount;

        // Update agent's balance if agent exists
        if (application.agentId) {
            application.agentId.availableBalance += application.commissionAmount;
            await application.agentId.save();
        }
    }

    await application.save();

    // Prepare response data
    return {
        ...application.toObject(),
        totalFees: await application.serviceId.calculateTotalMandatoryFees(),
        commissionRate: application.serviceId.commissionRate,
        agentBalance: application.agentId ? application.agentId.availableBalance : null
    };
};


// Update application status and commission
export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, paymentStatus, amountPaid, adminNotes } = req.body;

    const application = await Application.findById(id)
        .populate('serviceId')
        .populate('agentId');

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    // Validate input
    if (status && !['Pending', 'Approved', 'Rejected'].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }
    if (paymentStatus && !['Pending', 'Partial', 'Completed'].includes(paymentStatus)) {
        throw new ApiError(400, "Invalid payment status");
    }
    if (amountPaid !== undefined && (isNaN(amountPaid) || amountPaid < 0)) {
        throw new ApiError(400, "Invalid amount paid");
    }

    const updatedApplication = await prepareApplicationUpdate(application, {
        status,
        paymentStatus,
        amountPaid,
        adminNotes
    });

    res.status(200).json({
        success: true,
        application: updatedApplication
    });
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