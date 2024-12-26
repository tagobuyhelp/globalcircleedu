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
    const { userId } = req.params;

    // Fetch all messages where the user is either the sender or receiver
    const messages = await ChatMessage.find({
        $or: [
            { sender: userId },
            { receiver: userId }
        ]
    })
    .sort({ createdAt: -1 }) // Sort by most recent first
    .populate('sender', 'name email') // Populate sender details
    .populate('receiver', 'name email'); // Populate receiver details

    // Group messages by conversation (i.e., by the other user involved)
    const groupedMessages = messages.reduce((acc, message) => {
        const otherUser = message.sender._id.toString() === userId 
            ? message.receiver._id.toString() 
            : message.sender._id.toString();
        
        if (!acc[otherUser]) {
            acc[otherUser] = [];
        }
        acc[otherUser].push(message);
        return acc;
    }, {});

    // Format the response
    const conversations = Object.keys(groupedMessages).map(otherUserId => ({
        otherUser: groupedMessages[otherUserId][0].sender._id.toString() === userId 
            ? groupedMessages[otherUserId][0].receiver 
            : groupedMessages[otherUserId][0].sender,
        lastMessage: groupedMessages[otherUserId][0],
        messages: groupedMessages[otherUserId]
    }));

    res.status(200).json({
        success: true,
        data: conversations
    });
});