import { University } from "../models/university.model";
import { asyncHandler } from "../utils/asyncHandler";

export const createUniversity = asyncHandler(async (req, res) => {
    const universityData = req.body;
    const university = new University(universityData);
    await university.save();
    res.status(201).json({ success: true, university });
});

export const getAllUniversities = asyncHandler(async (req, res) => {
    const universities = await University.find();
    res.status(200).json({ success: true, universities });
});

export const getUniversityById = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    const university = await University.findById(universityId);
    if (!university) {
        return res.status(404).json({ success: false, message: 'University not found' });
    }
    res.status(200).json({ success: true, university });
});

export const updateUniversity = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    const updateData = req.body;

    const university = await University.findByIdAndUpdate(
        universityId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!university) {
        return res.status(404).json({ success: false, message: 'University not found' });
    }

    res.status(200).json({ success: true, university });
});

export const deleteUniversity = asyncHandler(async (req, res) => {
    const universityId = req.params.id;
    const university = await University.findByIdAndDelete(universityId);
    if (!university) {
        return res.status(404).json({ success: false, message: 'University not found' });
    }
    res.status(200).json({ success: true, message: 'University deleted successfully' });
});
