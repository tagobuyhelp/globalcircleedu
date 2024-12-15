import { Visitor } from "../models/visitor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getPhotoPath } from '../middleware/photoUpload.middleware.js';
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Create a new visitor
export const createVisitor = asyncHandler(async (req, res) => {
    try {
        const visitorData = req.body;
        visitorData.documents = {};

        // Handle profile picture
        if (req.files && req.files.profilePicture) {
            const profilePicture = req.files.profilePicture[0];
            visitorData.profilePicture = getPhotoPath(profilePicture.filename);
        }

        // Handle document uploads
        const documentFields = ['identityDocument', 'transcript', 'workExperience', 'languageTests'];
        documentFields.forEach(field => {
            if (req.files && req.files[field]) {
                const file = req.files[field][0];
                visitorData.documents[field] = {
                    name: file.originalname,
                    fileURL: getPhotoPath(file.filename),
                    documentType: file.mimetype,
                };
            }
        });

        // Save visitor data
        const visitor = await Visitor.create(visitorData);

        res.status(201).json(new ApiResponse(201, visitor, "Visitor created successfully"));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, error.message));
    }
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

    // Add base URL to profile pictures and documents
    const visitorsWithFullUrls = visitors.map(visitor => {
        const visitorObj = visitor.toObject();
        if (visitorObj.profilePicture) {
            visitorObj.profilePicture = `${BASE_URL}${visitorObj.profilePicture}`;
        }
        if (visitorObj.documents) {
            Object.keys(visitorObj.documents).forEach(docType => {
                if (visitorObj.documents[docType].fileURL) {
                    visitorObj.documents[docType].fileURL = `${BASE_URL}${visitorObj.documents[docType].fileURL}`;
                }
            });
        }
        return visitorObj;
    });

    res.status(200).json(new ApiResponse(200, {
        visitors: visitorsWithFullUrls,
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

    // Add base URL to profile picture and documents
    const visitorObj = visitor.toObject();

    if (visitorObj.profilePicture) {
        visitorObj.profilePicture = `${BASE_URL}${visitorObj.profilePicture}`;
    }

    if (visitorObj.documents) {
        Object.keys(visitorObj.documents).forEach(docType => {
            if (visitorObj.documents[docType].fileURL) {
                visitorObj.documents[docType].fileURL = `${BASE_URL}${visitorObj.documents[docType].fileURL}`;
            }
        });
    }

    res.status(200).json(new ApiResponse(200, visitorObj, "Visitor fetched successfully"));
});


// Update a visitor
export const updateVisitor = asyncHandler(async (req, res) => {
    const visitorId = req.params.id;
    const updateData = req.body;

    // Find the existing visitor
    let visitor = await Visitor.findById(visitorId);
    if (!visitor) {
        throw new ApiError(404, "Visitor not found");
    }

    // Handle profile picture update
    if (req.files && req.files.profilePicture) {
        const profilePicture = req.files.profilePicture[0];
        updateData.profilePicture = getPhotoPath(profilePicture.filename);
    }

    // Handle document updates
    const documentFields = ['identityDocument', 'transcript', 'workExperience', 'languageTests'];
    documentFields.forEach(field => {
        if (req.files && req.files[field]) {
            const file = req.files[field][0];
            if (!updateData.documents) updateData.documents = {};
            updateData.documents[field] = {
                name: file.originalname,
                fileURL: getPhotoPath(file.filename),
                documentType: file.mimetype,
            };
        }
    });

    // Update the visitor
    visitor = await Visitor.findByIdAndUpdate(visitorId, updateData, {
        new: true,
        runValidators: true,
    }).populate("interestedCourse");

    // Add base URL to profile picture and documents for response
    const visitorObj = visitor.toObject();

    if (visitorObj.profilePicture) {
        visitorObj.profilePicture = `${BASE_URL}${visitorObj.profilePicture}`;
    }

    if (visitorObj.documents) {
        Object.keys(visitorObj.documents).forEach(docType => {
            if (visitorObj.documents[docType].fileURL) {
                visitorObj.documents[docType].fileURL = `${BASE_URL}${visitorObj.documents[docType].fileURL}`;
            }
        });
    }

    res.status(200).json(new ApiResponse(200, visitorObj, "Visitor updated successfully"));
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