import { Application } from "../models/application.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { notifyAdmins, notifyUser } from "../utils/sendEmail.js";

// Create a new application
export const createApplication = asyncHandler(async (req, res) => {
    const { agentId, visitorId, services, adminNotes } = req.body;

    if (!visitorId || !services || services.length === 0) {
        throw new ApiError(400, "Visitor ID and at least one service are required");
    }

    const application = new Application({
        agentId,
        visitorId,
        services: services.map((service) => ({
            serviceId: service.serviceId,
            status: service.status || "Pending",
            paymentStatus: service.paymentStatus || "Pending",
            amountPaid: service.amountPaid || 0,
            commissionAmount: 0, // This will be calculated later
        })),
        adminNotes,
        createdBy: req.user._id,
    });

    // Calculate totals
    application.totalAmountPaid = application.services.reduce(
        (total, service) => total + service.amountPaid,
        0
    );
    application.totalCommissionAmount = 0; // This will be calculated later when commissions are determined

    await application.save();

    // Populate the services information
    await application.populate("services.serviceId visitorId agentId");

    // Notify admins about the new application
    await notifyAdmins(
        "New Application Created",
        `A new application has been created for visitor ${application.visitorId.name}.`,
        `<h1>New Application Created</h1>
         <p>A new application has been created for visitor ${application.visitorId.name}.</p>
         <p>Application ID: ${application._id}</p>`
    );

    // Notify the agent if exists
    if (application.agentId) {
        await notifyUser(
            application.agentId.email,
            "New Application Assigned",
            `A new application has been assigned to you for visitor ${application.visitorId.name}.`,
            `<h1>New Application Assigned</h1>
             <p>A new application has been assigned to you for visitor ${application.visitorId.name}.</p>
             <p>Application ID: ${application._id}</p>`
        );
    }

    res.status(201).json({
        success: true,
        application: application,
    });
});

// Get all applications (with filtering and pagination)
export const getAllApplications = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const query = {};

    if (req.query.status) query["services.status"] = req.query.status;
    if (req.query.paymentStatus)
        query["services.paymentStatus"] = req.query.paymentStatus;
    if (req.query.serviceId) query["services.serviceId"] = req.query.serviceId;

    if (req.query.startDate && req.query.endDate) {
        query.createdAt = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
        };
    }

    const total = await Application.countDocuments(query);
    const applications = await Application.find(query)
        .populate("visitorId agentId services.serviceId")
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);

    res.status(200).json({
        success: true,
        count: applications.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: applications,
    });
});

// Get a single application
export const getApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id).populate(
        "visitorId agentId services.serviceId"
    );

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    res.status(200).json({
        success: true,
        data: application,
    });
});

// Update an application
export const updateApplication = asyncHandler(async (req, res) => {
    let application = await Application.findById(req.params.id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    const { services, adminNotes, status } = req.body;

    if (services) {
        application.services = services.map((service) => ({
            serviceId: service.serviceId,
            status: service.status,
            paymentStatus: service.paymentStatus,
            amountPaid: service.amountPaid,
            commissionAmount: service.commissionAmount,
        }));

        application.totalAmountPaid = services.reduce(
            (total, service) => total + service.amountPaid,
            0
        );
        application.totalCommissionAmount = services.reduce(
            (total, service) => total + service.commissionAmount,
            0
        );
    }

    if (adminNotes) {
        application.adminNotes = adminNotes;
    }

    if (status) {
        application.status = status;
    }

    application = await application.save();
    await application.populate("visitorId agentId services.serviceId");

    // Notify the agent about the update
    if (application.agentId) {
        await notifyUser(
            application.agentId.email,
            "Application Updated",
            `The application for visitor ${application.visitorId.name} has been updated.`,
            `<h1>Application Updated</h1>
             <p>The application for visitor ${application.visitorId.name} has been updated.</p>
             <p>Application ID: ${application._id}</p>
             <p>New Status: ${application.status}</p>`
        );
    }

    res.status(200).json({
        success: true,
        data: application,
    });
});

// Delete an application
export const deleteApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    await application.remove();

    // Notify admins about the deletion
    await notifyAdmins(
        "Application Deleted",
        `An application has been deleted.`,
        `<h1>Application Deleted</h1>
         <p>An application has been deleted.</p>
         <p>Application ID: ${application._id}</p>`
    );

    res.status(200).json({
        success: true,
        message: "Application deleted successfully",
    });
});
