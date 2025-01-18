import express from 'express';
import { uploadPhotos } from '../middleware/photoUpload.middleware.js';
import { cloudinaryUpload } from "../utils/cloudinaryUpload.js";

const router = express.Router();

router.post('/upload', uploadPhotos, async (req, res) => {
    try {
        const uploadPromises = Object.values(req.files).flat().map(file => cloudinaryUpload(file));
        const results = await Promise.all(uploadPromises);

        const urls = results.map(result => result.secure_url);

        res.status(200).json({ success: true, urls });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ success: false, message: 'Error uploading files' });
    }
});

export default router;