import { Degree } from "../models/degree.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createDegree = asyncHandler(async (req, res) => {
    const degreeData = req.body;
    const degree = new Degree(degreeData);
    await degree.save();
    res.status(201).json({ success: true, degree });
});

export const getAllDegrees = asyncHandler(async (req, res) => {
    const degrees = await Degree.find();
    res.status(200).json({ success: true, degrees });
});

export const getDegreeById = asyncHandler(async (req, res) => {
    const degreeId = req.params.id;
    const degree = await Degree.findById(degreeId);
    if (!degree) {
        return res.status(404).json({ success: false, message: 'Degree not found' });
    }
    res.status(200).json({ success: true, degree });
});

export const updateDegree = asyncHandler(async (req, res) => {
    const degreeId = req.params.id;
    const updateData = req.body;

    const degree = await Degree.findByIdAndUpdate(
        degreeId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!degree) {
        return res.status(404).json({ success: false, message: 'Degree not found' });
    }

    res.status(200).json({ success: true, degree });
});

export const deleteDegree = asyncHandler(async (req, res) => {
    const degreeId = req.params.id;
    const degree = await Degree.findByIdAndDelete(degreeId);
    if (!degree) {
        return res.status(404).json({ success: false, message: 'Degree not found' });
    }
    res.status(200).json({ success: true, message: 'Degree deleted successfully' });
});
