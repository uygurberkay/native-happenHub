import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js'

dotenv.config()

// routes
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import agendaRouter from './routes/agendaRoutes.js'

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
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/message', messageRouter)
app.use("/api/v1/post", postRouter);
app.use("/api/v1/agenda", agendaRouter);

app.listen(process.env.PORT,() => {
    console.log(`Server is running at PORT: ${process.env.PORT}`.bgGreen.white)
})