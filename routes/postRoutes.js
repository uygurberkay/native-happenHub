import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
    createPostController, 
    deletePostController, 
    getAllPostsContoller, 
    getUserPostsController,
    updatePostController
} from '../controllers/postController.js';

const router = Router();

router.post("/create-post", authMiddleware, createPostController);
router.get("/get-all-post", getAllPostsContoller);
router.get("/get-user-post", authMiddleware, getUserPostsController);
router.delete("/delete-post/:id", authMiddleware, deletePostController);
router.put("/update-post/:id", authMiddleware, updatePostController);

export default router;