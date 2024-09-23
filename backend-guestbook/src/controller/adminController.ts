import { Request, Response } from 'express';
import AdminService from "../service/adminService";

class AdminController {

    async deleteUser(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            await AdminService.deleteUser(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(err.message === 'User not found' ? 404 : 400).json({ message: err.message });
        }
    }


    async banUser(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            await AdminService.banUser(userId);
            res.status(200).json({ message: 'User banned successfully' });
        } catch (err) {
            res.status(err.message === 'User not found' ? 404 : 400).json({ message: err.message });
        }
    }


    async deletePost(req: Request, res: Response) {
        const { postId } = req.params;
        try {
            await AdminService.deletePost(postId);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (err) {
            res.status(err.message === 'Post not found' ? 404 : 400).json({ message: err.message });
        }
    }
}

export default new AdminController();
