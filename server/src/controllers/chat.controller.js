import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatMessage } from '../models/chatMessage.model.js';

export const saveMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const sender = req.user._id;
    const receiver = 'Admin'; // Set receiver as 'Admin'

    const newMessage = await ChatMessage.create({ 
        sender, 
        receiver, 
        message,
        read: false // New messages are unread by default
    });

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

    // Fetch all messages where the user is the sender
    const messages = await ChatMessage.find({sender: userId})
        .sort({ createdAt: -1 }) // Sort by most recent first
        .populate('sender', 'name email'); // Populate sender details

    // Count unread messages (where Admin is the sender and read is false)
    const unreadCount = await ChatMessage.countDocuments({
        sender: 'Admin',
        receiver: userId,
        read: false
    });

    // Format the response
    const conversation = {
        otherUser: { name: 'Admin' },
        lastMessage: messages[0] || null,
        messages: messages,
        unreadCount: unreadCount
    };

    res.status(200).json({
        success: true,
        data: conversation
    });
});

export const markMessagesAsRead = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Mark all messages from Admin to this user as read
    await ChatMessage.updateMany(
        { sender: 'Admin', receiver: userId, read: false },
        { $set: { read: true } }
    );

    res.status(200).json({
        success: true,
        message: "Messages marked as read"
    });
});