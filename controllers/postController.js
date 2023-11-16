import { StatusCodes } from "http-status-codes";
import postModel from "../models/postModel.js";

/* CREATE POST */
export const createPostController = async (req,res) => {
    try {
        const {title, description} = req.body
        // Validation
        if(!title || !description){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: false,
                message: 'Please Provide All Fields',
            })
        }
        const post = await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save();
        res.status(StatusCodes.CREATED).json({
            status: true,
            message: 'Post Created Successfully',
            post,
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            messsage: 'Error in Create Post API',
            error
        })
    }
}
/* GET ALL POST */
export const getAllPostsContoller = async (req,res) => {
    try {
        const posts = await postModel
            .find()
            .populate('postedBy', '_id name')
            .sort({createdAt: -1})
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'All Posts Data',
            posts,
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            messsage: 'Error in Create Post API',
            error,
        })
    }
}

export const getUserPostsController = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            messsage: 'Error in Create Post API',
            error
        })
    }
}

export const deletePostController = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            messsage: 'Error in Create Post API',
            error
        })
    }
}

export const updatePostController = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            messsage: 'Error in Create Post API',
            error
        })
    }
}