import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Please add name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: [true, 'Please add password'],
        min: 6,
        max: 64,
    },
    image: {
        type: String,
        required: false,
    },
    role: {
        type : String,
        enum: ['user','proUser','admin'],
        default: 'user',
    },
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    sentFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    },
    
    {timestamps: true}
);

export default mongoose.model('User', userSchema);