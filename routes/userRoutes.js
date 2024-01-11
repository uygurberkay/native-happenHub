import { Router } from 'express';
import { 
    friendRequests,
    friendRequestAccept,
    friendRequestsById,
    getUsersExceptLoggedIn,
    loginController, 
    registerController, 
    updateUserController,
    getFriendList,
    getUserDetails,
    sendFriendRequest,
    showFriendList
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router()

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/friend-request/accept', authMiddleware, friendRequestAccept);

router.patch('/update-user', authMiddleware ,updateUserController);

router.get('/users/:userId', authMiddleware, getUsersExceptLoggedIn);

router.get('/user/:userId', authMiddleware, getUserDetails);
router.get('/friend-request', authMiddleware, friendRequests);
router.get('/friends/:userId', authMiddleware, showFriendList);
router.get('/friend-request/:userId', authMiddleware, friendRequestsById);
router.get('/friend-requests/sent/:userId', authMiddleware, sendFriendRequest);
router.get('/accepted-friends/:userId"', authMiddleware, getFriendList);

export default router;