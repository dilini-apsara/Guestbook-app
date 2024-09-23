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
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../entity/post");
class PostService {
    // Create a new post
    createPost(userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = new post_1.Post({
                user: userId,
                content,
            });
            yield post.save();
            return post;
        });
    }
    // Get all posts
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.Post.find().populate('user', 'email');
            return posts;
        });
    }
    // Delete a post
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_1.Post.findByIdAndDelete(postId);
            if (!post) {
                throw new Error('Post not found');
            }
        });
    }
}
exports.default = new PostService();
//# sourceMappingURL=postService.js.map