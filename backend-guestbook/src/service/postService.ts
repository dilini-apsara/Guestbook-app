import {Post} from "../entity/post";


class PostService {

    async createPost(title: string, content: string,author:string) {
        const post = new Post({
            title,
            content,
            author
        });
        await post.save();
        return post;
    }

    async getAllPosts() {
        const posts = await Post.find().populate('user', 'email');
        return posts;
    }

    async deletePost(postId: string) {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            throw new Error('Post not found');
        }
    }
}

export default new PostService();
