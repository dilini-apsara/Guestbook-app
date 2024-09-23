import { Router } from 'express';
import { Post } from '../entity/post';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import PostController from "../controller/postController";

const router = Router();


router.get('/',authMiddleware,PostController.getAllPosts);
router.post('/',authMiddleware,PostController.createPost);
router.delete('/:postId',authMiddleware,PostController.deletePost);




export default router;
