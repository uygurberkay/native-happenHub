import { Router } from 'express';
import { 
    loginController, 
    registerController, 
    updateUserController
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router()

router.post('/register', registerController);
router.post('/login', loginController)
router.patch('/update-user', authMiddleware ,updateUserController)

export default router;