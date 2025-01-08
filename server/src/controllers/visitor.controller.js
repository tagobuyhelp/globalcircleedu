import { Visitor } from "../models/visitor.model.js";
import { University } from "../models/university.model.js";
import { Course } from "../models/course.model.js"
import { Job } from '../models/job.model.js';
import { News } from '../models/news.model.js';
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
        .populate("interestedJob")
        .skip(skip)
        .limit(limit);

    const total = await Visitor.countDocuments(filter);

    // Add base URL to profile pictures and documents
    const visitorsWithFullUrls = visitors.map(visitor => {
        const visitorObj = visitor.toObject();
        if (visitorObj.profilePicture) {
            visitorObj.profilePicture = `${BASE_URL}/${visitorObj.profilePicture}`;
        }
        if (visitorObj.documents) {
            Object.keys(visitorObj.documents).forEach(docType => {
                if (visitorObj.documents[docType].fileURL) {
                    visitorObj.documents[docType].fileURL = `${BASE_URL}/${visitorObj.documents[docType].fileURL}`;
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
    const visitor = await Visitor.findById(visitorId)
            .populate("interestedCourse")
            .populate("interestedJob");

    if (!visitor) {
        throw new ApiError(404, "Visitor not found");
    }

    // Add base URL to profile picture and documents
    const visitorObj = visitor.toObject();

    if (visitorObj.profilePicture) {
        visitorObj.profilePicture = `${BASE_URL}/${visitorObj.profilePicture}`;
    }

    if (visitorObj.documents) {
        Object.keys(visitorObj.documents).forEach(docType => {
            if (visitorObj.documents[docType].fileURL) {
                visitorObj.documents[docType].fileURL = `${BASE_URL}/${visitorObj.documents[docType].fileURL}`;
            }
        });
    }

    res.status(200).json(new ApiResponse(200, visitorObj, "Visitor fetched successfully"));
});


// Update a visitor
// Update a visitor
export const updateVisitor = asyncHandler(async (req, res) => {
    const visitorId = req.params.id;
    let updateData;

    console.log("Content-Type:", req.get('Content-Type'));

    if (req.is('multipart/form-data')) {
        // Handle form-data
        updateData = req.body;
        console.log("Received form-data:", updateData);
    } else {
        // Handle JSON data
        updateData = req.body;
        console.log("Received JSON data:", JSON.stringify(updateData, null, 2));
    }

    console.log(updateData);

    // Find the existing visitor
    let visitor = await Visitor.findById(visitorId);
    if (!visitor) {
        visitor = await Visitor.findOne({user: visitorId});
        if (!visitor) {
            throw new ApiError(404, "Visitor not found");
        }
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
    visitor = await Visitor.findByIdAndUpdate(visitor._id, updateData, {
        new: true,
        runValidators: true,
    })
    .populate("interestedCourse")
    .populate("interestedJob");

    if (!visitor) {
        throw new ApiError(404, "Visitor not found after update");
    }

    // Add base URL to profile picture and documents for response
    const visitorObj = visitor.toObject();

    if (visitorObj.profilePicture) {
        visitorObj.profilePicture = `${BASE_URL}${visitorObj.profilePicture}`;
    }

    if (visitorObj.documents) {
        Object.keys(visitorObj.documents).forEach(docType => {
            if (visitorObj.documents[docType].fileURL) {
                visitorObj.documents[docType].fileURL = `${BASE_URL}/${visitorObj.documents[docType].fileURL}`;
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

// Get advanced visitor statistics
export const getVisitorStats = asyncHandler(async (req, res) => {
    const [visitorStats, universitiesCount, coursesCount, jobsCount, newsCount] = await Promise.all([
        Visitor.aggregate([
            {
                $facet: {
                    "basicStats": [
                        {
                            $group: {
                                _id: null,
                                totalVisitors: { $sum: 1 },
                                averageAge: { $avg: "$age" },
                                maleCount: { $sum: { $cond: [{ $eq: ["$gender", "Male"] }, 1, 0] } },
                                femaleCount: { $sum: { $cond: [{ $eq: ["$gender", "Female"] }, 1, 0] } },
                                otherGenderCount: { $sum: { $cond: [{ $and: [{ $ne: ["$gender", "Male"] }, { $ne: ["$gender", "Female"] }] }, 1, 0] } },
                                studentCount: { $sum: { $cond: [{ $eq: ["$visitorType", "Student"] }, 1, 0] } },
                                workerCount: { $sum: { $cond: [{ $eq: ["$visitorType", "Worker"] }, 1, 0] } },
                                totalDocumentsUploaded: { $sum: { $cond: [{ $isArray: "$documents" }, { $size: "$documents" }, 0] } },
                                averageEducationLevel: { $avg: "$education.level" }
                            }
                        }
                    ],
                    "countryDistribution": [
                        { $group: { _id: "$country", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 }
                    ],
                    "interestedCourses": [
                        { $group: { _id: "$interestedCourse", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        {
                            $lookup: {
                                from: "courses",
                                localField: "_id",
                                foreignField: "_id",
                                as: "courseDetails"
                            }
                        },
                        { $unwind: "$courseDetails" },
                        { $project: { courseName: "$courseDetails.name", count: 1 } }
                    ],
                    "ageDistribution": [
                        {
                            $bucket: {
                                groupBy: "$age",
                                boundaries: [0, 18, 25, 35, 45, 55, 65],
                                default: "65+",
                                output: { count: { $sum: 1 } }
                            }
                        }
                    ],
                    "monthlyTrends": [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { _id: 1 } },
                        { $limit: 12 }
                    ],
                    "educationLevelDistribution": [
                        { $group: { _id: "$education.level", count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ],
                    "preferredContactMethod": [
                        { $group: { _id: "$preferredContact", count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ],
                    "consultationBookingRate": [
                        {
                            $group: {
                                _id: null,
                                totalVisitors: { $sum: 1 },
                                bookedConsultations: { $sum: { $cond: ["$isConsultationBooked", 1, 0] } }
                            }
                        },
                        {
                            $project: {
                                bookingRate: { $divide: ["$bookedConsultations", "$totalVisitors"] }
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    basicStats: { $arrayElemAt: ["$basicStats", 0] },
                    topCountries: "$countryDistribution",
                    topInterestedCourses: "$interestedCourses",
                    ageDistribution: "$ageDistribution",
                    monthlyTrends: "$monthlyTrends",
                    educationLevelDistribution: "$educationLevelDistribution",
                    preferredContactMethod: "$preferredContactMethod",
                    consultationBookingRate: { $arrayElemAt: ["$consultationBookingRate", 0] }
                }
            }
        ]),
        University.countDocuments(),
        Course.countDocuments(),
        Job.countDocuments(),
        News.countDocuments()
    ]);

    if (!visitorStats || visitorStats.length === 0) {
        throw new ApiError(404, "No visitor statistics available");
    }

    // Calculate additional metrics
    const result = visitorStats[0];
    result.basicStats.genderDistribution = {
        male: result.basicStats.maleCount || 0,
        female: result.basicStats.femaleCount || 0,
        other: result.basicStats.otherGenderCount || 0
    };
    result.basicStats.visitorTypeDistribution = {
        student: result.basicStats.studentCount || 0,
        worker: result.basicStats.workerCount || 0
    };
    
    // Handle potential null values for averageAge and averageEducationLevel
    result.basicStats.averageAge = result.basicStats.averageAge 
        ? parseFloat(result.basicStats.averageAge.toFixed(1)) 
        : null;
    result.basicStats.averageEducationLevel = result.basicStats.averageEducationLevel 
        ? parseFloat(result.basicStats.averageEducationLevel.toFixed(1)) 
        : null;

    // Calculate total unique countries
    result.totalUniqueCountries = result.topCountries ? result.topCountries.length : 0;

    // Add counts for universities, courses, jobs, and news
    result.totalCounts = {
        universities: universitiesCount,
        courses: coursesCount,
        jobs: jobsCount,
        news: newsCount
    };

    res.status(200).json(new ApiResponse(200, result, "Advanced visitor statistics fetched successfully"));
});