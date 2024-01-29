import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
    createEvent, 
    deleteMessage, 
    getAllEventById, 
    getAllEventByIdAndDate,
    messagesBetweenUsers,
    sendMessage,
} from '../controllers/agendaController.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = Router();

router.post("/create-event", authMiddleware, createEvent);

router.get("/get-events", authMiddleware,);

router.get("/get-events/:userId", authMiddleware, getAllEventById);

router.get("/get-events/:userId/:formattedDate", authMiddleware, getAllEventByIdAndDate);

router.post('/send' , authMiddleware, upload.single("imageFile") , sendMessage);

router.post('/deleteMessages' , authMiddleware,  deleteMessage);

router.get('/messages/:senderId/:recipientId' , authMiddleware, messagesBetweenUsers);

export default router;