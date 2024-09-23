import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Ensure this path is correct

import UserService from "../service/userService";


class UserController {
    // Get user profile
    async getProfile(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            const user = await UserService.getProfile(req.user.id);
            res.status(200).json({ user });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Update user profile
    async updateProfile(req: AuthRequest, res: Response) {
        const { username} = req.body;

        try {

            if (!req.user) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            const updatedUser = await UserService.updateProfile(req.user!.id, username);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ user: updatedUser,message: 'Username updated successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Delete user account
    async deleteAccount(req: AuthRequest, res: Response) {
        try {

            if (!req.user) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            await UserService.deleteAccount(req.user.id);
            res.status(200).json({ message: 'Account deleted successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

// Forgot Password handler
//     async forgotPassword(req: Request, res: Response) {
//
//         try {
//             const { email } = req.body ;
//            // const body = req.body as Partial<ForgotPasswordRequest>;
//
//             if (email) {
//                 return res.status(400).json({ message: "Email is required" });
//             }
//
//             await UserService.generatePasswordResetToken(email);
//             res.status(200).json({ message: 'Password reset link sent to your email' });
//         } catch (err) {
//             res.status(400).json({ message: err.message });
//         }
//     }

    // Reset Password handler
    // async resetPassword(req: ResetPasswordRequest, res: Response) {
    //
    //     try {
    //         const token = req.params.token;
    //         //const token = req.url;
    //
    //         //const body = req.body as Partial<ResetPasswordRequest>;
    //
    //         // const { token } = req.url;
    //          const { password } = req.body;
    //
    //         if (!password) {
    //             return res.status(400).json({ message: "New password is required" });
    //         }
    //
    //         await UserService.resetPassword(token, password);
    //         res.status(200).json({ message: 'Password reset successful' });
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // }


}

export default new UserController();
