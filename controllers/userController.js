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

/* ACCESS ALL USER EXCEPT LOGINED */
export const getUsersExceptLoggedIn =  (req,res) => {

        /* Gets loggedInUser */
        const loggedInUserId = req.params.userId;
        userModel.find({ _id: { $ne: loggedInUserId } })
            .then((users) => {
            res.status(StatusCodes.OK).json(users);
            })
            .catch((error) => {
            console.log("Error retrieving users", err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error retrieving users',
                error,
            });
            });
}

/* FRIEND REQUESTS */

export const friendRequests = async (req,res) => {
    /* Gets currentUserId and selectedUserId  */
    const { currentUserId, selectedUserId } = req.body;
    
    try {
        /* Update the recepient's friendRequestsArray */
        await userModel.findByIdAndUpdate(selectedUserId, {
            $push: { friendRequests: currentUserId },
        });

        /* Update the sender's sentFriendRequests array */
        await userModel.findByIdAndUpdate(currentUserId, {
            $push: { sentFriendRequests: selectedUserId },
        });
        res.status(StatusCodes.OK)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Friend requests does not found',
            error,
        })
    }
}

/* GETS ALL FRIEND REQUEST FROM userID */

export const friendRequestsById = async (req,res) => {
    try {
        const { userId } = req.params;
        
        //fetch the user document based on the User id
        const user = await userModel.findById(userId)
        .populate("friendRequests", "name email image")
        .lean();

        const friendRequests = user.friendRequests;

        res.status(StatusCodes.OK).json(friendRequests)

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Friend requests does not found',
            error,
        })
    }
}

/* GETS ACCEPTED FRIEND LISTS */

export const getFriendList = async (req,res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId)
            .populate(
                "friends",
                "name email image"
            );
        console.log(user)
        const acceptedFriends = user.friends;
        res.json(acceptedFriends);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }

}

/* FRIEND REQUEST ACCEPT */

export const friendRequestAccept = async (req,res) => {
    try {
        const { senderId, recepientId } = req.body;

        //retrieve the documents of sender and the recipient
        const sender = await userModel.findById(senderId);
        const recepient = await userModel.findById(recepientId);
    
        sender.friends.push(recepientId);
        recepient.friends.push(senderId);
    
        recepient.friendRequests = recepient.friendRequests.filter(
            (request) => request.toString() !== senderId.toString()
        );
    
        sender.sentFriendRequests = sender.sentFriendRequests.filter(
            (request) => request.toString() !== recepientId.toString
        );
    
        await sender.save();
        await recepient.save();
    
        res.status(200).json({ message: "Friend Request accepted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/* SINGLE USER DETAILES */

export const getUserDetails = async (req,res) => {
    try {
        const { userId } = req.params;

        /* Recipient Info getting by userId */
        const recipientId = await userModel.findById(userId);

        res.status(StatusCodes.OK).json(recipientId)

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            error,
        })
    }
}


/* GETS FRIEND REQUESTS */

export const sendFriendRequest = async (req,res) => {
    try {
        const {userId} = req.params;
        const user = await userModel.findById(userId)
            .populate("sentFriendRequests","name email image")
            .lean();

        const sentFriendRequests = user.sentFriendRequests;

        res.status(StatusCodes.OK).json(sentFriendRequests)

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            error,
        })
    }
}

/* GETS FRİEND LİSTS */

export const showFriendList = async (req,res) => {
    try {
        const {userId} = req.params;

        userModel.findById(userId)
            .populate("friends")
            .then((user) => {
                if(!user){
                    return res.status(StatusCodes.NOT_FOUND).json({
                        message: 'User not found'
                    })
                }

                /* Maps all the friends userId has */
                const friendIds = user.friends.map((friend) => friend._id);

                res.status(StatusCodes.OK).json(friendIds)
            })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            error,
        })
    }
}
