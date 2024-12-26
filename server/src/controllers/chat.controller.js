import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatMessage } from '../models/chatMessage.model.js';

export const saveMessage = asyncHandler(async (req, res) => {
    const { receiver, message } = req.body;
    const sender = req.user._id;

    const newMessage = await ChatMessage.create({ sender, receiver, message });

    // Populate the sender and receiver fields of the new message
    await newMessage.populate('sender', 'name email');
    await newMessage.populate('receiver', 'name email');

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
        if (!message.sender || !message.receiver) {
            console.error('Invalid message:', message);
            return acc; // Skip this message
        }

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
    const conversations = Object.keys(groupedMessages).map(otherUserId => {
        const conversation = groupedMessages[otherUserId];
        const firstValidMessage = conversation.find(msg => msg.sender && msg.receiver);
        
        if (!firstValidMessage) {
            console.error('No valid messages in conversation:', otherUserId);
            return null; // Skip this conversation
        }

        return {
            otherUser: firstValidMessage.sender._id.toString() === userId 
                ? firstValidMessage.receiver 
                : firstValidMessage.sender,
            lastMessage: conversation[0],
            messages: conversation
        };
    }).filter(Boolean); // Remove any null entries

    res.status(200).json({
        success: true,
        data: conversations
    });
});