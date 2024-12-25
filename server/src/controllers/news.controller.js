import { News } from "../models/news.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { getPhotoPath } from '../middleware/photoUpload.middleware.js';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Create News
export const createNews = asyncHandler(async (req, res) => {
    const newsData = req.body;

    if (req.files && req.files.imageUrl) {
        newsData.imageUrl = getPhotoPath(req.files.imageUrl[0].filename);
    }

    const news = await News.create(newsData);

    // Add base URL to imageUrl for response
    const newsObj = news.toObject();
    if (newsObj.imageUrl) {
        newsObj.imageUrl = `${BASE_URL}/${newsObj.imageUrl}`;
    }

    res.status(201).json(new ApiResponse(201, newsObj, "News created successfully"));
});

export const getAllNews = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await News.countDocuments();
    const newsList = await News.find()
        .sort({ publishedAt: -1 }) // Sort by publishedAt in descending order
        .skip(startIndex)
        .limit(limit);

    // Add base URL to imageUrl
    const newsListWithFullUrls = newsList.map(news => {
        const newsObj = news.toObject();
        if (newsObj.imageUrl) {
            newsObj.imageUrl = `${BASE_URL}/${newsObj.imageUrl}`;
        }
        return newsObj;
    });

    const pagination = {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
    };

    res.status(200).json(new ApiResponse(200, {
        news: newsListWithFullUrls,
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

    // Find news with the same category, excluding the current news
    const relatedNews = await News.find({
        _id: { $ne: id },
        category: { $in: currentNews.category }
    })
    .limit(3) // Limit to 3 related news items
    .select('title content category publishedAt imageUrl'); // Select only necessary fields

    // Add base URL to imageUrl for each related news item
    const relatedNewsWithFullUrls = relatedNews.map(news => {
        const newsObj = news.toObject();
        if (newsObj.imageUrl) {
            newsObj.imageUrl = `${BASE_URL}/${newsObj.imageUrl}`;
        }
        return newsObj;
    });

    res.status(200).json(new ApiResponse(200, relatedNewsWithFullUrls, "Related news fetched successfully"));
});
// Get News by ID
export const getNewsById = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (!news) {
        throw new ApiError(404, "News not found");
    }

    // Add base URL to imageUrl
    const newsObj = news.toObject();
    if (newsObj.imageUrl) {
        newsObj.imageUrl = `${BASE_URL}/${newsObj.imageUrl}`;
    }

    res.status(200).json(new ApiResponse(200, newsObj, "News fetched successfully"));
});

// Update News
export const updateNews = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const updateData = req.body;

    if (req.files && req.files.imageUrl) {
        updateData.imageUrl = getPhotoPath(req.files.imageUrl[0].filename);
    }

    const news = await News.findByIdAndUpdate(newsId, updateData, { new: true, runValidators: true });

    if (!news) {
        throw new ApiError(404, "News not found");
    }

    // Add base URL to imageUrl for response
    const newsObj = news.toObject();
    if (newsObj.imageUrl) {
        newsObj.imageUrl = `${BASE_URL}/${newsObj.imageUrl}`;
    }

    res.status(200).json(new ApiResponse(200, newsObj, "News updated successfully"));
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