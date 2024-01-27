import { StatusCodes } from "http-status-codes";
import messageModel from '../models/messageModel.js'
import multer from 'multer'
import { upload } from "../middleware/multerMiddleware.js";

// // Configure multer for handling file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "files/"); // Specify the desired destination folder
//     },
//     filename: function (req, file, cb) {
//         // Generate a unique filename for the uploaded file
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + "-" + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

/* Controllers */

/* CREATE MESSAGE */

export const sendMessage =  async (req, res) => {
    try {
        const { senderId, recipientId, messageType, messageText } = req.body;

        console.log(senderId, ' and ' , recipientId, ' and ' , messageType, ' and ' ,messageText)
    
        const newMessage = new messageModel({
            senderId,
            recipientId,
            messageType,
            message: messageText,
            timestamp: new Date(),
            // imageUrl: messageType === "image" ? req.file.path : null,
        });
    
        await newMessage.save();

        res.status(StatusCodes.OK).json({
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
        const { senderId, recipientId } = req.params;
        console.log(senderId, ' and ', recipientId)
        const messages = await messageModel.find({
        $or: [
            { senderId: senderId, recipientId: recipientId },
            { senderId: recipientId, recipientId: senderId },
        ],
        }).populate("senderId", "_id name");

        res.status(StatusCodes.OK).json(messages);
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
        res.status(StatusCodes.OK).json({
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