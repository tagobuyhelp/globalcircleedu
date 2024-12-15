import { University } from "../models/university.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createUniversity = async (req, res) => {
    try {
        const universityData = req.body;

        if (req.files) {
            if (req.files.logo) {
                universityData.logo = getPhotoPath(req.files.logo[0].filename);
            }
            if (req.files.campusPhotos) {
                universityData.campusPhotos = req.files.campusPhotos.map(file => getPhotoPath(file.filename));
            }
        }

        const university = await University.create(universityData);
        res.status(201).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getAllUniversities = asyncHandler(async (req, res) => {
    const universities = await University.find();

    // Add base URL to logo and campus photos
    const universitiesWithFullUrls = universities.map(uni => {
        const uniObj = uni.toObject();
        if (uniObj.logo) {
            uniObj.logo = `${BASE_URL}/${uniObj.logo}`;
        }
        if (uniObj.campusPhotos) {
            uniObj.campusPhotos = uniObj.campusPhotos.map(photo => `${BASE_URL}/${photo}`);
        }
        return uniObj;
    });

    res.status(200).json(new ApiResponse(200, universitiesWithFullUrls, "Universities fetched successfully"));
});

export const getUniversityById = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    const university = await University.findById(universityId);
    if (!university) {
        throw new ApiError(404, "University not found");
    }

    // Add base URL to logo and campus photos
    const uniObj = university.toObject();
    if (uniObj.logo) {
        uniObj.logo = `${BASE_URL}/${uniObj.logo}`;
    }
    if (uniObj.campusPhotos) {
        uniObj.campusPhotos = uniObj.campusPhotos.map(photo => `${BASE_URL}/${photo}`);
    }

    res.status(200).json(new ApiResponse(200, uniObj, "University fetched successfully"));
});

export const updateUniversity = async (req, res) => {
    try {
        const updateData = req.body;

        if (req.files) {
            if (req.files.logo) {
                updateData.logo = getPhotoPath(req.files.logo[0].filename);
            }
            if (req.files.campusPhotos) {
                updateData.campusPhotos = req.files.campusPhotos.map(file => getPhotoPath(file.filename));
            }
        }

        const university = await University.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!university) {
            return res.status(404).json({ success: false, error: 'University not found' });
        }

        res.status(200).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


export const deleteUniversity = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    const university = await University.findByIdAndDelete(universityId);
    if (!university) {
        throw new ApiError(404, "University not found");
    }
    res.status(200).json(new ApiResponse(200, null, "University deleted successfully"));
});
