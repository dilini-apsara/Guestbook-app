import {  Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Ensure this path is correct

import PostService from "../service/postService";


class PostController {
    // Create a new post
    async createPost(req: AuthRequest, res: Response) {
        const { title,content } = req.body;
        const author=req.user?.id;

        try {
            if (!req.user) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            const post = await PostService.createPost(title, content,author);
            res.status(201).json({ post });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Get all posts
    async getAllPosts(req: AuthRequest, res: Response) {
        try {
            const posts = await PostService.getAllPosts();
            res.status(200).json({ posts });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Delete a post
    async deletePost(req: AuthRequest, res: Response) {
        const { postId } = req.params;

        try {
            await PostService.deletePost(postId);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default new PostController();
