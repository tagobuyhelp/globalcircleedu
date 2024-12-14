import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "News title is required"],
        },
        content: {
            type: String,
            required: [true, "News content is required"],
        },
        author: {
            type: String,
        },
        category: {
            type: String,
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
        imageUrl: {
            type: String,
        },
        tags: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

export const News = mongoose.model("News", newsSchema);
