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
                message: props => `${props.value} is not a valid email address!`,
            },
        },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`,
            },
        },
        whatsapp: { type: String, default: '' },
        visitorType: {
            type: String,
            required: true,
            enum: ['Student', 'Worker'],
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
            level: { type: String, required: true }, // e.g., High School, Undergraduate
            institution: { type: String }, // Name of institution
            fieldOfStudy: { type: String }, // Discipline/field
            degreeName: { type: String }, // Name of degree or course
            courseType: { type: String }, // e.g., Full-Time, Part-Time
            modeOfStudy: { type: String }, // e.g., On-Campus, Distance Learning
            mediumOfEducation: { type: String }, // e.g., English
            division: { type: String }, // e.g., First Division
            score: {
                value: { type: String }, // Percentage or numerical score
                grade: { type: String }, // e.g., A, B+
            },
        },
        professional: {
            companyName: { type: String }, // For workers only
            jobTitle: { type: String },
            yearsOfExperience: { type: Number },
        },
        documents: [
            {
                documentName: { type: String }, // e.g., Passport, Certificate
                documentURL: { type: String }, // Link to the uploaded document
                documentType: { type: String }, // e.g., PDF, Image
                verificationStatus: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' },
            },
        ],
        profilePicture: { type: String }, // URL for profile picture
        preferredContact: { type: String, enum: ['Phone', 'Email', 'WhatsApp'] },
        gender: { type: String, enum: ['Male', 'Female', 'Non-Binary', 'Other'] },
        age: { type: Number },
        isConsultationBooked: { type: Boolean, default: false },
        notes: { type: String }, // Internal notes
        preferredConsultationDate: { type: Date },
        referralSource: { type: String }, // E.g., Google, Social Media
    },
    { timestamps: true }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);
