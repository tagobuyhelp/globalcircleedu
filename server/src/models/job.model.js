import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
        },
        description: {
            type: String,
            required: [true, "Job description is required"],
        },
        company: {
            type: String,
            required: [true, "Company name is required"],
        },
        location: {
            type: String,
            required: [true, "Job location is required"],
        },
        country: {
            type: String,
            required: [true, "Country is required"],
        },
        jobType: {
            type: String,
            enum: ["Full-Time", "Part-Time", "Internship", "Freelance", "Contract"],
            required: [true, "Job type is required"],
        },
        salary: {
            type: String, // You can use Number for numeric salaries
        },
        requirements: {
            type: [String], // List of skills/qualifications
        },
        postedAt: {
            type: Date,
            default: Date.now,
        },
        applicationDeadline: {
            type: Date,
        },
        tags: {
            type: [String], // Relevant tags for the job
        },
    },
    {
        timestamps: true,
    }
);

export const Job = mongoose.model("Job", jobSchema);
