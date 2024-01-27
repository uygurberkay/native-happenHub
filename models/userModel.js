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
        required: [true, 'Please add password'],
        min: 6,
        max: 64,
    },
    phone: {
        type: String,
        required: false,
        default: '+90 555 55 55',
    },
    location: {
        type: String,
        required: false,
        default: 'Izmir',
    },
    image: {
        type: String,
        required: false,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
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