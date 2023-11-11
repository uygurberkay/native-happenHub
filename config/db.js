import mongoose from 'mongoose';
import chalk from 'colors';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to DATABASE ${mongoose.connection.host}`.bgCyan.white);
        
    } catch (error) {
        console.log(`error in connection DB ${error}`.green)
    }
}

export default connectDB;