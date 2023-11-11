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
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
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
        default: 'user',
    }},
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);