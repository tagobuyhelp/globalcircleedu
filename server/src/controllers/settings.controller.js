import { Setting } from '../models/setting.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getAllSettings = asyncHandler(async (req, res) => {
    const isAdmin = req.user && req.user.role === 'admin';
    const query = isAdmin ? {} : { isPublic: true };
    
    const settings = await Setting.find(query);
    res.status(200).json(new ApiResponse(200, settings, "Settings fetched successfully"));
});

export const getSettingByKey = asyncHandler(async (req, res) => {
    const { key } = req.params;
    const setting = await Setting.findOne({ key });
    
    if (!setting) {
        throw new ApiError(404, "Setting not found");
    }
    
    if (!setting.isPublic && (!req.user || req.user.role !== 'admin')) {
        throw new ApiError(403, "You don't have permission to access this setting");
    }
    
    res.status(200).json(new ApiResponse(200, setting, "Setting fetched successfully"));
});

export const createSetting = asyncHandler(async (req, res) => {
    const { key, value, type, description, isPublic } = req.body;
    
    const existingSetting = await Setting.findOne({ key });
    if (existingSetting) {
        throw new ApiError(400, "Setting with this key already exists");
    }
    
    const setting = await Setting.create({
        key,
        value,
        type,
        description,
        isPublic
    });
    
    res.status(201).json(new ApiResponse(201, setting, "Setting created successfully"));
});

export const updateSetting = asyncHandler(async (req, res) => {
    const { key } = req.params;
    const { value, type, description, isPublic } = req.body;
    
    const setting = await Setting.findOne({ key });
    
    if (!setting) {
        throw new ApiError(404, "Setting not found");
    }
    
    setting.value = value;
    setting.type = type;
    setting.description = description;
    setting.isPublic = isPublic;
    
    await setting.save();
    
    res.status(200).json(new ApiResponse(200, setting, "Setting updated successfully"));
});

export const deleteSetting = asyncHandler(async (req, res) => {
    const { key } = req.params;
    
    const setting = await Setting.findOneAndDelete({ key });
    
    if (!setting) {
        throw new ApiError(404, "Setting not found");
    }
    
    res.status(200).json(new ApiResponse(200, null, "Setting deleted successfully"));
});