import { News } from "../models/news.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create News
export const createNews = asyncHandler(async (req, res) => {
    const newsData = req.body;
    const news = new News(newsData);
    await news.save();
    res.status(201).json({ success: true, news });
});

// Get All News
export const getAllNews = asyncHandler(async (req, res) => {
    const newsList = await News.find();
    res.status(200).json({ success: true, newsList });
});

// Get News by ID
export const getNewsById = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    if (!news) {
        return res.status(404).json({ success: false, message: "News not found" });
    }
    res.status(200).json({ success: true, news });
});

// Update News
export const updateNews = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const updateData = req.body;
    const news = await News.findByIdAndUpdate(newsId, updateData, { new: true, runValidators: true });
    if (!news) {
        return res.status(404).json({ success: false, message: "News not found" });
    }
    res.status(200).json({ success: true, news });
});

// Delete News
export const deleteNews = asyncHandler(async (req, res) => {
    const newsId = req.params.id;
    const news = await News.findByIdAndDelete(newsId);
    if (!news) {
        return res.status(404).json({ success: false, message: "News not found" });
    }
    res.status(200).json({ success: true, message: "News deleted successfully" });
});
