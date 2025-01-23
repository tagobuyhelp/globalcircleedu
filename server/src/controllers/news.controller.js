import { News } from "../models/news.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

// Create News
export const createNews = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required");
    }

    let imageUrl;
    if (req.files.imageUrl) {
        const result = await uploadToCloudinary(req.files.imageUrl[0]);
        news.imageUrl = result.url;
    }

    const news = await News.create({
        title,
        content,
        author,
        imageUrl
    });

    res.status(201).json(new ApiResponse(201, news, "News created successfully"));
});

export const getAllNews = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await News.countDocuments();
    const newsList = await News.find()
        .sort({ publishedAt: -1 })
        .skip(startIndex)
        .limit(limit);

    const pagination = {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
    };

    res.status(200).json(new ApiResponse(200, {
        news: newsList,
        pagination
    }, "News fetched successfully"));
});


// Get Related News
export const getRelatedNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const currentNews = await News.findById(id);

    if (!currentNews) {
        throw new ApiError(404, "News not found");
    }

    const relatedNews = await News.find({
        _id: { $ne: id },
        category: { $in: currentNews.category }
    })
    .sort({ publishedAt: -1 }) // Sort by most recent first
    .limit(3) // Limit to 3 related news items
    .select('title content category publishedAt imageUrl'); // Select only necessary fields

    // Process the related news items
    const relatedNewsProcessed = relatedNews.map(news => {
        const newsObj = news.toObject();
        // Add a truncated version of the content for preview
        newsObj.contentPreview = newsObj.content.substring(0, 100) + '...';
        return newsObj;
    });

    res.status(200).json(new ApiResponse(200, relatedNewsProcessed, "Related news fetched successfully"));
});


// Get News by ID
export const getNewsById = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id);

    if (!news) {
        throw new ApiError(404, "News not found");
    }

    res.status(200).json(new ApiResponse(200, news, "News fetched successfully"));
});

// Update News
// Update News
export const updateNews = asyncHandler(async (req, res) => {
    let news = await News.findById(req.params.id);

    if (!news) {
        throw new ApiError(404, "News not found");
    }

    const { title, content, author, category } = req.body;

    if (req.files.imageUrl) {
        const result = await uploadToCloudinary(req.files.imageUrl[0]);
        news.imageUrl = result.url;
    }

    news.title = title || news.title;
    news.content = content || news.content;
    news.author = author || news.author;
    news.category = category || news.category;

    news = await news.save();

    res.status(200).json(new ApiResponse(200, news, "News updated successfully"));
});

// Delete News
export const deleteNews = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const news = await News.findByIdAndDelete(newsId);

    if (!news) {
        throw new ApiError(404, "News not found");
    }

    res.status(200).json(new ApiResponse(200, null, "News deleted successfully"));
});