import { Visitor } from "../models/visitor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create a new visitor
export const createVisitor = asyncHandler(async (req, res) => {
    const visitorData = req.body;
    const visitor = await Visitor.create(visitorData);
    res.status(201).json(new ApiResponse(201, visitor, "Visitor created successfully"));
});

// Get all visitors with pagination and filtering
export const getAllVisitors = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.name) filter.name = new RegExp(req.query.name, 'i');
    if (req.query.email) filter.email = new RegExp(req.query.email, 'i');

    const visitors = await Visitor.find(filter)
        .populate("interestedCourse")
        .skip(skip)
        .limit(limit);

    const total = await Visitor.countDocuments(filter);

    res.status(200).json(new ApiResponse(200, {
        visitors,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalVisitors: total
    }, "Visitors fetched successfully"));
});

// Get visitor by ID
export const getVisitorById = asyncHandler(async (req, res) => {
    const visitorId = req.params.id;
    const visitor = await Visitor.findById(visitorId).populate("interestedCourse");
    if (!visitor) {
        throw new ApiError(404, "Visitor not found");
    }
    res.status(200).json(new ApiResponse(200, visitor, "Visitor fetched successfully"));
});

// Update a visitor
export const updateVisitor = asyncHandler(async (req, res) => {
    const visitorId = req.params.id;
    const updateData = req.body;

    const visitor = await Visitor.findByIdAndUpdate(visitorId, updateData, {
        new: true,
        runValidators: true,
    }).populate("interestedCourse");

    if (!visitor) {
        throw new ApiError(404, "Visitor not found");
    }

    res.status(200).json(new ApiResponse(200, visitor, "Visitor updated successfully"));
});

// Delete a visitor
export const deleteVisitor = asyncHandler(async (req, res) => {
    const visitorId = req.params.id;
    const visitor = await Visitor.findByIdAndDelete(visitorId);
    if (!visitor) {
        throw new ApiError(404, "Visitor not found");
    }
    res.status(200).json(new ApiResponse(200, null, "Visitor deleted successfully"));
});

// Bulk create visitors
export const bulkCreateVisitors = asyncHandler(async (req, res) => {
    const visitorsData = req.body;
    if (!Array.isArray(visitorsData)) {
        throw new ApiError(400, "Invalid input. Expected an array of visitors.");
    }
    const visitors = await Visitor.insertMany(visitorsData);
    res.status(201).json(new ApiResponse(201, visitors, "Visitors created successfully"));
});

// Get visitor statistics
export const getVisitorStats = asyncHandler(async (req, res) => {
    const stats = await Visitor.aggregate([
        {
            $group: {
                _id: null,
                totalVisitors: { $sum: 1 },
                averageAge: { $avg: "$age" },
                mostInterestedCourse: { $max: "$interestedCourse" }
            }
        }
    ]);

    res.status(200).json(new ApiResponse(200, stats[0], "Visitor statistics fetched successfully"));
});