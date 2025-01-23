import { Testimonial } from "../models/testimonial.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

// Add a new testimonial
export const addTestimonial = asyncHandler(async (req, res) => {
    const { name, role, testimonial, rating, videoUrl } = req.body;

    let imageUrl;
    if (req.file) {
        const result = await uploadToCloudinary(req.file);
        imageUrl = result.url;
    }

    const newTestimonial = new Testimonial({
        name,
        role,
        testimonial,
        rating,
        image: imageUrl,
        videoUrl
    });

    await newTestimonial.save();

    res.status(201).json(new ApiResponse(201, newTestimonial, "Testimonial added successfully"));
});

// Get all testimonials
export const getAllTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, testimonials, "Testimonials fetched successfully"));
});

// Get testimonial by ID
export const getTestimonialById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
        throw new ApiError(404, "Testimonial not found");
    }

    res.status(200).json(new ApiResponse(200, testimonial, "Testimonial fetched successfully"));
});

// Update a testimonial
export const updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, role, testimonial, rating, videoUrl } = req.body;

    const existingTestimonial = await Testimonial.findById(id);

    if (!existingTestimonial) {
        throw new ApiError(404, "Testimonial not found");
    }

    if (req.file) {
        const result = await uploadToCloudinary(req.file);
        existingTestimonial.image = result.url;
    }

    existingTestimonial.name = name || existingTestimonial.name;
    existingTestimonial.role = role || existingTestimonial.role;
    existingTestimonial.testimonial = testimonial || existingTestimonial.testimonial;
    existingTestimonial.rating = rating || existingTestimonial.rating;
    existingTestimonial.videoUrl = videoUrl || existingTestimonial.videoUrl;

    await existingTestimonial.save();

    res.status(200).json(new ApiResponse(200, existingTestimonial, "Testimonial updated successfully"));
});

// Delete a testimonial
export const deleteTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
        throw new ApiError(404, "Testimonial not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Testimonial deleted successfully"));
});