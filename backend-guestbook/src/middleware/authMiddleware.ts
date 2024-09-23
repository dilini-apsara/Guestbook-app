import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {IUser, User} from '../entity/user';

export interface AuthRequest extends Request {
    user?: IUser;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({message: 'Authentication required'});
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({message: 'Invalid token'});
        }
        console.log('middle ware ' + user);
        req.user = user; // Attach user to the request object
        console.log(user);
        next();
    } catch (err) {
        res.status(401).json({message: 'Invalid or expired token'});
    }
};