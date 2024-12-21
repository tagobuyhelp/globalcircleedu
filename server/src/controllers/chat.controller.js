import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatMessage } from '../models/chatMessage.model.js';

export const saveMessage = asyncHandler(async (req, res) => {
    const { receiver, message } = req.body;
    const sender = req.user._id;

    const newMessage = await ChatMessage.create({ sender, receiver, message });

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newMessage
    });
});

export const getMessages = asyncHandler(async (req, res) => {
    const { userId, otherUserId } = req.params;

    const messages = await ChatMessage.find({
        $or: [
            { sender: userId, receiver: otherUserId },
            { sender: otherUserId, receiver: userId }
        ]
    }).sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        data: messages
    });
});