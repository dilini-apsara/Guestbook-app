"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postService_1 = __importDefault(require("../service/postService"));
class PostController {
    // Create a new post
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content } = req.body;
            try {
                if (!req.user) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                const post = yield postService_1.default.createPost(req.user.id, content);
                res.status(201).json({ post });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    // Get all posts
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postService_1.default.getAllPosts();
                res.status(200).json({ posts });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    // Delete a post
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.params;
            try {
                yield postService_1.default.deletePost(postId);
                res.status(200).json({ message: 'Post deleted successfully' });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
}
exports.default = new PostController();
//# sourceMappingURL=postController.js.map