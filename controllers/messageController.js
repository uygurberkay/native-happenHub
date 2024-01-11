import { StatusCodes } from "http-status-codes";
import messageModel from '../models/messageModel.js'

/* Controllers */

/* CREATE MESSAGE */

export const sendMessage =  async (req, res) => {
    try {
        const { senderId, recipientId, messageType, messageText } = req.body;
    
        const newMessage = new messageModel({
            senderId,
            recipientId,
            messageType,
            message: messageText,
            timestamp: new Date(),
            imageUrl: messageType === "image" ? req.file.path : null,
        });
    
        await newMessage.save();

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Message sent Successfully'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: 'Internal Server Error',
            error,
        })
    }
};

/* MESSAGES BETWEEN USERS */

export const messagesBetweenUsers =  async (req, res) => {
    try {
        const { senderId, recepientId } = req.params;

        const messages = await messageModel.find({
        $or: [
            { senderId: senderId, recepientId: recepientId },
            { senderId: recepientId, recepientId: senderId },
        ],
        }).populate("senderId", "_id name");

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Message found',
            messages
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: 'Internal Server Error',
            error,
        })
    }
};

/* DELETE MESSAGE */

export const deleteMessage =  async (req, res) => {
    try {
        const { messages } = req.body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                message: "invalid req body!" 
            });
        }

        await messageModel.deleteMany({ _id: { $in: messages } });
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Message deleted successfully',
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: 'Internal Server Error',
            error,
        })
    }
};