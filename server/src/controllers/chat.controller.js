import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatMessage } from '../models/chatMessage.model.js';
import { notifyAdmins } from '../utils/sendEmail.js';


export const saveVisitorMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const visitorId = req.user._id;

    const newMessage = await ChatMessage.create({
        visitorId,
        message,
        isFromAdmin: false,
        read: false
    });

    await newMessage.populate('visitorId', 'name email');

    // Notify admins about the new message
    const subject = 'New Chat Message from Visitor';
    const emailMessage = `A new message has been received from ${newMessage.visitorId.name} (${newMessage.visitorId.email}).`;
    const html = `
        <h1>New Chat Message</h1>
        <p>${emailMessage}</p>
        <p><strong>Message:</strong> "${message}"</p>
        <p>Please log in to the admin panel to respond.</p>
    `;

    try {
        await notifyAdmins(subject, emailMessage, html);
        console.log('Admin notification sent successfully');
    } catch (error) {
        console.error('Failed to send admin notification:', error);
        // Consider whether you want to throw an error here or just log it
    }

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newMessage
    });
});

export const saveAdminMessage = asyncHandler(async (req, res) => {
    const { message, visitorId } = req.body;

    const newMessage = await ChatMessage.create({
        visitorId,
        message,
        isFromAdmin: true,
        read: false
    });

    res.status(201).json({
        success: true,
        message: "Admin message sent successfully",
        data: newMessage
    });
});

export const getMessagesByVisitor = asyncHandler(async (req, res) => {
    const visitorId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await ChatMessage.find({ visitorId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await ChatMessage.countDocuments({ visitorId });

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

    const distinctVisitors = await ChatMessage.distinct('visitorId');
    const totalVisitors = distinctVisitors.length;

    const visitors = distinctVisitors.slice(skip, skip + limit);

    const groupedMessages = {};
    for (const visitorId of visitors) {
        const messages = await ChatMessage.find({ visitorId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('visitorId', 'name email');

        groupedMessages[visitorId] = messages;
    }

    res.status(200).json({
        success: true,
        data: {
            conversations: groupedMessages,
            currentPage: page,
            totalPages: Math.ceil(totalVisitors / limit),
            totalVisitors: totalVisitors
        }
    });
});

export const markMessagesAsRead = asyncHandler(async (req, res) => {
    const visitorId = req.user._id;

    await ChatMessage.updateMany(
        { visitorId, isFromAdmin: true, read: false },
        { $set: { read: true } }
    );

    res.status(200).json({
        success: true,
        message: "Messages marked as read"
    });
});