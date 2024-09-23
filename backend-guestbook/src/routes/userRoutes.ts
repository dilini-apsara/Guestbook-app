import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import UserController from "../controller/userController";



const router = Router();

router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.delete('/delete', authMiddleware, UserController.deleteAccount);

export default router;
