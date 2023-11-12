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
    role: {
        type : String,
        enum: ['user','proUser','admin'],
        default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
    },
    
    {timestamps: true}
);

export default mongoose.model('User', userSchema);