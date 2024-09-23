import { Request, Response } from 'express';
import AuthService from "../service/authService";
import {User} from "../entity/user";


class AuthController {
    // Login controller
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const token = await AuthService.login(email, password);
            res.status(200).json({ token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Register controller
    async register(req: Request, res: Response) {
        const { username,email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User already registered' });
            }
            const user = await AuthService.register(username,email, password);
            res.status(201).json({ user });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default new AuthController();
