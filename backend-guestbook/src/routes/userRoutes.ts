import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import UserController from "../controller/userController";



const router = Router();

router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.delete('/delete', authMiddleware, UserController.deleteAccount);

// // Forgot password route
// router.post('/forgot-password', UserController.forgotPassword);
//
// // Reset password route (with token)




//router.post('/reset-password/:token', (req: ResetPasswordRequest, res) => UserController.resetPassword(req as ResetPasswordRequest, res));




export default router;
