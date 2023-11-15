import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import { 
    hashPassword, 
    comparePassword 
} from '../utils/passwordUtils.js';

/* Controllers */

/* REGİSTER USER */
export const registerController = async (req,res) => {
    try {
        const {name , email, password} = req.body;
        // Validation
        if(!name || !email) {
            return (
                res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'name is required'
            })
            )
        }
        if(!password || password.length < 6){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Password must be at least 6 char'
        })
        }
        /* Existing user */
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'User already registered with this email'
            })
        }

        // Hashed Password
        const hashedPassword = await hashPassword(password)

        /* Save user */
        const user = await userModel({
            name, 
            email, 
            password: hashedPassword,
        }).save()

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Registeration successsfull. Please login'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: 'Error in Register API',
            error,
        })
    };
}

/* LOGIN USER */
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        // Validation
        if (!email || !password) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Please Provide Email Or Password",
            });
        }
        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User Not Found",
            });
        }
        // Match password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(StatusCodes.NOT_FOUND).send({
                success: false,
                message: "Invalid  password",
            });
        }
        // Token JWT
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

        // Unshow password
        user.password = undefined
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Login successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: 'Error in Register API',
            error,
        })
    }
}

/* UPDATE USER */

export const updateUserController = async (req,res) => {
    try {
        const {name, password, email, avatar} = req.body;

        // User Validate
        const user = await userModel.findOne({email})

        // Password Validate
        if(password && password.length < 6) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Password must be at least 6 characters long",
            })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;

        // Updated User
        const updatedUser = await userModel.findOneAndUpdate({email}, {
            name: name || user.name,
            password: hashedPassword || user.password
        }, {new: true});

        updatedUser.password = undefined;
        
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Profile Updated Please Login',
            updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error in User Update API',
            error,
        })
    }
}