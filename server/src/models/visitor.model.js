import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /\d{10}/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        whatsapp: { type: String, default: "" },
        visitorType: {
            type: String,
            required: true,
            enum: ["Student", "Worker"],
        },
        interestedCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        country: { type: String, required: true },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String },
        },
        education: {
            level: {
                type: String,
                enum: ["Intermediate", "Bachelor", "Masters"],
                required: true,
            },
            institution: { type: String }, // Name of the institution
            fieldOfStudy: { type: String }, // Discipline/Field
            degreeName: { type: String }, // Name of the degree/course
            courseType: { type: String }, // e.g., Full-Time, Part-Time
            modeOfStudy: { type: String }, // e.g., On-Campus, Distance Learning
            mediumOfEducation: { type: String }, // e.g., English
            division: { type: String }, // e.g., First Division
            score: {
                percentage: { type: Number, min: 0, max: 100 }, // Previous degree score in percentage
                gpa: { type: Number, min: 0, max: 4.0 }, // GPA score
            },
            yearOfReceiving: { type: Number }, // Year of receiving the degree
        },
        professional: {
            companyName: { type: String }, // For workers only
            jobTitle: { type: String }, // Current work/internship title
            yearsOfExperience: { type: Number },
        },
        documents: {
            identityDocument: {
                name: { type: String, default: "Identity Document" },
                fileURL: { type: String },
                documentType: { type: String, default: "PDF" },
            },
            transcript: {
                name: { type: String, default: "Transcript of Previous Degree" },
                fileURL: { type: String },
                documentType: { type: String, default: "PDF" },
            },
            workExperience: {
                name: { type: String, default: "Work Experience/Job Letter" },
                fileURL: { type: String },
                documentType: { type: String, default: "PDF" },
            },
            languageTests: {
                name: { type: String, default: "Language/Other Tests" },
                fileURL: { type: String },
                documentType: { type: String, default: "PDF" },
            },
        },
        profilePicture: { type: String }, // URL for profile picture
        preferredContact: { type: String, enum: ["Phone", "Email", "WhatsApp"] },
        gender: { type: String, enum: ["Male", "Female", "Non-Binary", "Other"] },
        age: { type: Number },
        isConsultationBooked: { type: Boolean, default: false },
        notes: { type: String }, // Internal notes
        preferredConsultationDate: { type: Date },
        referralSource: { type: String }, // E.g., Google, Social Media
    },
    { timestamps: true }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);
