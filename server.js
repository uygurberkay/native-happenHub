import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js'
import { StatusCodes } from 'http-status-codes'; // Take it controllers later

dotenv.config()

/* Database Connection */
connectDB()

const app = express()

/* Middlewares */
app.use(cors())
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

/* ROUTES */
app.get('',(req,res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Wellcome to React native Mern Stack'
    })
})


app.listen(process.env.PORT,() => {
    console.log(`Server is running at PORT: ${process.env.PORT}`.bgGreen.white)
})