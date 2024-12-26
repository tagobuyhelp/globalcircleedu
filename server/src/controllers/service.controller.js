import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createService = asyncHandler(async (req, res) => {
    const { name, description, type, fees, commissionRate } = req.body;

    const service = await Service.create({
        name,
        description,
        type,
        fees,
        commissionRate
    });

    res.status(201).json(new ApiResponse(201, service, "Service created successfully"));
});

export const getAllServices = asyncHandler(async (req, res) => {
    const services = await Service.find().populate('fees');
    
    if (!services || services.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No services found"));
    }

    res.status(200).json(new ApiResponse(200, services, "Services retrieved successfully"));
});


export const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (!service) {
        throw new ApiError(404, "Service not found");
    }
    res.status(200).json(new ApiResponse(200, service, "Service retrieved successfully"));
});

export const updateService = asyncHandler(async (req, res) => {
    const { name, description, type, fees, commissionRate } = req.body;
    const service = await Service.findByIdAndUpdate(
        req.params.id,
        { name, description, type, fees, commissionRate },
        { new: true, runValidators: true }
    );
    if (!service) {
        throw new ApiError(404, "Service not found");
    }
    res.status(200).json(new ApiResponse(200, service, "Service updated successfully"));
});

export const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
        throw new ApiError(404, "Service not found");
    }
    res.status(200).json(new ApiResponse(200, null, "Service deleted successfully"));
});