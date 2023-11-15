import { Router } from 'express';
import { 
    loginController, 
    registerController, 
    updateUserController
} from '../controllers/userController.js';

const router = Router()

router.post('/register', registerController);
router.post('/login', loginController)
router.patch('/update-user',updateUserController)

export default router;