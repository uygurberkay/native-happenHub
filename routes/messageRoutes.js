import { Router } from 'express';
import { 
    deleteMessage,
    messagesBetweenUsers, 
    sendMessage 
} from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = Router()

router.post('/send' , authMiddleware, upload.single("imageFile"),  sendMessage);
router.post('/deleteMessages' , authMiddleware,  deleteMessage);
router.get('/messages/:senderId/:recepientId' , authMiddleware, messagesBetweenUsers);

export default router;