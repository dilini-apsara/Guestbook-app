import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Ensure this path is correct

import UserService from "../service/userService";


class UserController {

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


}

export default new UserController();
