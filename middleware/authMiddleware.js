import { expressjwt } from "express-jwt";
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
});