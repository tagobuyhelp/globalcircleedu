import { Program } from "../models/program.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProgram = asyncHandler(async (req, res) => {
    const programData = req.body;
    const program = new Program(programData);
    await program.save();
    res.status(201).json({ success: true, program });
});

export const getAllPrograms = asyncHandler(async (req, res) => {
    const programs = await Program.find();
    res.status(200).json({ success: true, programs });
});

export const getProgramById = asyncHandler(async (req, res) => {
    const programId = req.params.id;
    const program = await Program.findById(programId);
    if (!program) {
        return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.status(200).json({ success: true, program });
});

export const updateProgram = asyncHandler(async (req, res) => {
    const programId = req.params.id;
    const updateData = req.body;

    const program = await Program.findByIdAndUpdate(
        programId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!program) {
        return res.status(404).json({ success: false, message: 'Program not found' });
    }

    res.status(200).json({ success: true, program });
});

export const deleteProgram = asyncHandler(async (req, res) => {
    const programId = req.params.id;
    const program = await Program.findByIdAndDelete(programId);
    if (!program) {
        return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.status(200).json({ success: true, message: 'Program deleted successfully' });
});
