import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatMessage } from '../models/chatMessage.model.js';

export const saveMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const sender = req.user._id;
    const receiver = 'Admin'; // Set receiver as 'Admin' for user messages

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

export const saveAdminMessage = asyncHandler(async (req, res) => {
    const { message, receiverId } = req.body;
    const sender = 'Admin';

    const newMessage = await ChatMessage.create({ 
        sender, 
        receiver: receiverId,
        message,
        read: false // New messages are unread by default
    });

    res.status(201).json({
        success: true,
        message: "Admin message sent successfully",
        data: newMessage
    });
});

export const getMessagesBySender = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await ChatMessage.find({ 
        $or: [
            { sender: userId, receiver: 'Admin' },
            { sender: 'Admin', receiver: userId }
        ]
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('sender', 'name email');

    const total = await ChatMessage.countDocuments({
        $or: [
            { sender: userId, receiver: 'Admin' },
            { sender: 'Admin', receiver: userId }
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            messages,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalMessages: total
        }
    });
});

export const getMessagesByAdmin = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get total count of unique senders
    const totalSenders = await ChatMessage.distinct('sender').count();

    // Get paginated list of senders
    const senders = await ChatMessage.distinct('sender')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    // Fetch messages for each sender
    const groupedMessages = {};
    for (const sender of senders) {
        const messages = await ChatMessage.find({
            $or: [
                { sender: sender, receiver: 'Admin' },
                { sender: 'Admin', receiver: sender }
            ]
        })
        .sort({ createdAt: -1 })
        .limit(10)  // Limit to last 10 messages per sender
        .populate('sender', 'name email');

        groupedMessages[sender] = messages;
    }

    res.status(200).json({
        success: true,
        data: {
            conversations: groupedMessages,
            currentPage: page,
            totalPages: Math.ceil(totalSenders / limit),
            totalSenders: totalSenders
        }
    });
});

export const markMessagesAsRead = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    await ChatMessage.updateMany(
        { sender: 'Admin', receiver: userId, read: false },
        { $set: { read: true } }
    );

    res.status(200).json({
        success: true,
        message: "Messages marked as read"
    });
});