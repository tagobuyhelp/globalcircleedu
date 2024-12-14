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
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        whatsapp: { type: String, default: '' },
        interestedCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        country: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);