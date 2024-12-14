import { Job } from "../models/job.model";
import { asyncHandler } from "../utils/asyncHandler";

// Create Job
export const createJob = asyncHandler(async (req, res) => {
    const jobData = req.body;
    const job = new Job(jobData);
    await job.save();
    res.status(201).json({ success: true, job });
});

// Get All Jobs
export const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find();
    res.status(200).json({ success: true, jobs });
});

// Get Job by ID
export const getJobById = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
});

// Update Job
export const updateJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const updateData = req.body;
    const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true, runValidators: true });
    if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
});

// Delete Job
export const deleteJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, message: "Job deleted successfully" });
});
