import mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema({
    title: {
        type : String,
        required: [true, 'Please add name'],
        trim: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'please add description'],
    },
    color: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        // Private --> true,
        // Public --> false
    },
    categories: {
        type: String,
        enum: ['Friends', 'Art', 'Events']
    },
    sendEventRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    eventRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    /* Kabul edilen requestler */
    colaboratives: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    /* Grup ID'si */
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messageType: {
        type: String,
        enum: ["text"],
        default: 'text',
    },
    message: String,
    timeStamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Agenda", agendaSchema);