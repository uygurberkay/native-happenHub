import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
    createEvent, 
    getAllEventById, 
    getAllEventByIdAndDate,
} from '../controllers/agendaController.js';

const router = Router();

router.post("/create-event", authMiddleware, createEvent);
router.get("/get-events", authMiddleware,);
router.get("/get-events/:userId", authMiddleware, getAllEventById);
router.get("/get-events/:userId/:formattedDate", authMiddleware, getAllEventByIdAndDate);
// router.delete("/delete-event/:id", authMiddleware, deletePostController);
// router.put("/update-event/:id", authMiddleware, updatePostController);

export default router;