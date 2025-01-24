import multer from 'multer';
import { ApiResponse } from "../utils/apiResponse.js";
import { University } from "../models/university.model.js";
import { Program } from "../models/program.model.js";
import { Course } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";


export const createUniversity = asyncHandler(async (req, res) => {
    const universityData = req.body;

    if (req.files) {
        if (req.files.logo) {
            const logoResult = await uploadToCloudinary(req.files.logo[0]);
            universityData.logo = logoResult.url;
        }
        if (req.files.campusPhotos) {
            const campusPhotoPromises = req.files.campusPhotos.map(file => uploadToCloudinary(file));
            const campusPhotoResults = await Promise.all(campusPhotoPromises);
            universityData.campusPhotos = campusPhotoResults.map(result => result.url);
        }
    }

    const university = await University.create(universityData);
    res.status(201).json(new ApiResponse(201, university, "University created successfully"));
});

export const getAllUniversities = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit =  100;
    const skip = (page - 1) * limit;

    const totalUniversities = await University.countDocuments();
    const universities = await University.find()


    const totalPages = Math.ceil(totalUniversities / limit);

    res.status(200).json(new ApiResponse(200, {
        universities: universities,
        currentPage: page,
        totalPages: totalPages,
        totalUniversities: totalUniversities
    }, "Universities fetched successfully"));
});

export const getUniversityById = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    const university = await University.findById(universityId);

    if (!university) {
        throw new ApiError(404, "University not found");
    }

    // Convert university document to a plain JavaScript object
    const uniObj = university.toObject();

    // Fetch programs for this university
    const programs = await Program.find({ university: universityId })
        .populate('degree', 'name');

    // Fetch courses for this university's programs
    const programIds = programs.map(program => program._id);
    const courses = await Course.find({ program: { $in: programIds } });

    // Add programs and courses to the university object
    uniObj.programs = programs.map(program => {
        const programObj = program.toObject();
        programObj.courses = courses.filter(course => course.program.toString() === program._id.toString());
        return programObj;
    });

    res.status(200).json(new ApiResponse(200, uniObj, "University fetched successfully"));
});

export const updateUniversity = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    let updateData = req.body;

    if (req.files) {
        if (req.files.logo) {
            const logoResult = await uploadToCloudinary(req.files.logo[0]);
            updateData.logo = logoResult.url;
        }
        if (req.files.campusPhotos) {
            const campusPhotoPromises = req.files.campusPhotos.map(file => uploadToCloudinary(file));
            const campusPhotoResults = await Promise.all(campusPhotoPromises);
            updateData.campusPhotos = campusPhotoResults.map(result => result.url);
        }
    }

    const university = await University.findByIdAndUpdate(universityId, updateData, { new: true });

    if (!university) {
        throw new ApiError(404, "University not found");
    }

    res.status(200).json(new ApiResponse(200, university, "University updated successfully"));
});

export const deleteUniversity = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    const university = await University.findByIdAndDelete(universityId);
    if (!university) {
        throw new ApiError(404, "University not found");
    }
    res.status(200).json(new ApiResponse(200, null, "University deleted successfully"));
});
