import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

export const cloudinaryUpload = (file) => {
    return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
            { folder: 'GceWeb' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        const stream = Readable.from(file.buffer);
        stream.pipe(upload);
    });
};