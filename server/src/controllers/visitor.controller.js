import { Visitor } from "../models/visitor.model.js";
import { University } from "../models/university.model.js";
import { Course } from "../models/course.model.js"
import { Job } from '../models/job.model.js';
import { News } from '../models/news.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { notifyAdmins, notifyUser } from '../utils/sendEmail.js';


// Create a new visitor
export const createVisitor = asyncHandler(async (req, res) => {
    const visitorData = req.body;
    visitorData.documents = {};

    // Handle profile picture
    if (req.files && req.files.profilePicture) {
        const profilePicture = req.files.profilePicture[0];
        const result = await uploadToCloudinary(profilePicture);
        visitorData.profilePicture = result.url;
    }

    // Handle document uploads
    const documentFields = ['identityDocument', 'transcript', 'workExperience', 'languageTests'];
    for (const field of documentFields) {
        if (req.files && req.files[field]) {
            const file = req.files[field][0];
            const result = await uploadToCloudinary(file);
            visitorData.documents[field] = {
                name: file.originalname,
                fileURL: result.url,
                documentType: file.mimetype,
            };
        }
    }

    // Save visitor data
    const visitor = await Visitor.create(visitorData);

    // Populate related fields
    await visitor.populate("interestedCourse interestedJob");

    await notifyAdmins(
        'New Visitor Registration',
        `A new visitor has registered: ${visitor.name} (${visitor.email})`,
        `<h1>New Visitor Registration</h1><p>A new visitor has registered:</p><p><strong>Name:</strong> ${visitor.name}</p><p><strong>Email:</strong> ${visitor.email}</p>`
    );
    
    await notifyUser(
        visitor.email,
        'Welcome to Global Circle Edu',
        `Dear ${visitor.name},\n\nThank you for registering with Global Circle Edu. We're excited to have you on board!`,
        `<h1>Welcome to Global Circle Edu</h1><p>Dear ${visitor.name},</p><p>Thank you for registering with Global Circle Edu. We're excited to have you on board!</p>`
    );

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
        .populate("interestedJob")
        .skip(skip)
        .limit(limit);

    const total = await Visitor.countDocuments(filter);

    

    res.status(200).json(new ApiResponse(200, {
        visitors: visitors,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalVisitors: total
    }, "Visitors fetched successfully"));
});


// Get visitor by ID
export const getVisitorById = asyncHandler(async (req, res) => {
    const visitorId = req.params.id;

    // Find the existing visitor
    let visitor = await Visitor.findById(visitorId)
        .populate("interestedCourse")
        .populate("interestedJob");
    if (!visitor) {
        visitor = await Visitor.findOne({user: visitorId})
            .populate("interestedCourse")
            .populate("interestedJob");
        if (!visitor) {
            throw new ApiError(404, "Visitor not found");
        }
    }

    res.status(200).json(new ApiResponse(200, visitor, "Visitor fetched successfully"));
});




// Update a visitor
export const updateVisitor = asyncHandler(async (req, res) => {
    const visitorId = req.params.id;
    let updateData = req.body;
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
        const result = await uploadToCloudinary(profilePicture);
        updateData.profilePicture = result.url;
    }

    // Handle document updates
    const documentFields = ['identityDocument', 'transcript', 'workExperience', 'languageTests'];
    if (!updateData.documents) updateData.documents = {};
    for (const field of documentFields) {
        if (req.files && req.files[field]) {
            const file = req.files[field][0];
            const result = await uploadToCloudinary(file);
            updateData.documents[field] = {
                name: file.originalname,
                fileURL: result.url,
                documentType: file.mimetype,
            };
        } else if (visitor.documents && visitor.documents[field]) {
            // Preserve existing documents if not updated
            updateData.documents[field] = visitor.documents[field];
        }
    }

    // Update the visitor
    visitor = await Visitor.findByIdAndUpdate(visitor._id, updateData, {
        new: true,
        runValidators: true,
    }).populate("interestedCourse interestedJob");

    if (!visitor) {
        throw new ApiError(404, "Visitor not found after update");
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