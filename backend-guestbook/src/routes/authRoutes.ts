import { Router, Request, Response } from 'express';
import dotenv from "dotenv";
import {authMiddleware} from "../middleware/authMiddleware";
import AuthController from "../controller/authController";

const router = Router();

dotenv.config();

console.log('auth '+process.env.MONGO_URI)


router.post('/register',AuthController.register);
router.post('/login',AuthController.login);


router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Auth route is working!' });
});



export default router;
