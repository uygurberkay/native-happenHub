import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messageType: {
        type: String,
        enum: ["text", "image"],
    },
    message: String,
    timeStamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Message',messageSchema);