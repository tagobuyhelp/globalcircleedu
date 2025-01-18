import { asyncHandler } from '../utils/asyncHandler.js';
import { TeamMember } from '../models/teamMember.model.js';

export const addTeamMember = asyncHandler(async (req, res) => {
    const { name, role, expertise, description, linkedin, email } = req.body;
    const image = req.file ? req.file.path : undefined;

    const teamMember = await TeamMember.create({
        name,
        role,
        image,
        expertise,
        description,
        linkedin,
        email
    });

    res.status(201).json({
        success: true,
        data: teamMember
    });
});

export const getAllTeamMembers = asyncHandler(async (req, res) => {
    const teamMembers = await TeamMember.find();
    res.status(200).json({
        success: true,
        data: teamMembers
    });
});

export const getTeamMemberById = asyncHandler(async (req, res) => {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
        return res.status(404).json({
            success: false,
            message: 'Team member not found'
        });
    }
    res.status(200).json({
        success: true,
        data: teamMember
    });
});

export const updateTeamMember = asyncHandler(async (req, res) => {
    let teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
        return res.status(404).json({
            success: false,
            message: 'Team member not found'
        });
    }

    const { name, role, expertise, description, linkedin, email } = req.body;
    const image = req.file ? req.file.path : teamMember.image;

    teamMember = await TeamMember.findByIdAndUpdate(req.params.id, {
        name,
        role,
        image,
        expertise,
        description,
        linkedin,
        email
    }, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        data: teamMember
    });
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
        return res.status(404).json({
            success: false,
            message: 'Team member not found'
        });
    }

    await teamMember.remove();

    res.status(200).json({
        success: true,
        message: 'Team member deleted successfully'
    });
});