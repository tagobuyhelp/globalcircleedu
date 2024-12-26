import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatMessage } from '../models/chatMessage.model.js';

export const saveMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const sender = req.user._id;
    const receiver = 'Admin'; // Set receiver as 'Admin'

    const newMessage = await ChatMessage.create({ sender, receiver, message });

    // Populate the sender field of the new message
    await newMessage.populate('sender', 'name email');

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newMessage
    });
});

export const getMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Fetch all messages where the user is the sender and Admin is the receiver, or vice versa
    const messages = await ChatMessage.find({sender: userId})
    .sort({ createdAt: -1 }) // Sort by most recent first
    .populate('sender', 'name email'); // Populate sender details

    // Format the response
    const conversation = {
        otherUser: { name: 'Admin'}, // You can set appropriate admin details
        lastMessage: messages[0] || null,
        messages: messages
    };

    res.status(200).json({
        success: true,
        data: conversation
    });
});