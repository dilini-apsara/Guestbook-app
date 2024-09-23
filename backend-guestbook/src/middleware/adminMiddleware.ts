import { Request, Response, NextFunction } from 'express';
import {IUser, User} from "../entity/user";
import {AuthRequest} from "./authMiddleware";


export const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id; // Check if the user is attached to the request
        if (!userId) {
            console.log('user id '+userId)
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId) as IUser;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
