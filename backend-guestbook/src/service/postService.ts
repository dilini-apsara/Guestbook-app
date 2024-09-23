import {Post} from "../entity/post";


class PostService {
    // Create a new post
    async createPost(userId: string, content: string) {
        const post = new Post({
            user: userId,
            content,
        });
        await post.save();
        return post;
    }

    // Get all posts
    async getAllPosts() {
        const posts = await Post.find().populate('user', 'email');
        return posts;
    }

    // Delete a post
    async deletePost(postId: string) {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            throw new Error('Post not found');
        }
    }
}

export default new PostService();
