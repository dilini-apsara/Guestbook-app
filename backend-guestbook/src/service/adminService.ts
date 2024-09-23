import {IUser, User} from "../entity/user";
import { Post } from "../entity/post"; // Assuming you have a Post model

class AdminService {

    async deleteUser(userId: string) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }


    async banUser(userId: string) {
        const user = await User.findById(userId) as IUser ;
        if (!user) {
            throw new Error('User not found');
        }
        user.isBanned = true;
        await user.save();
        return user;
    }


    async deletePost(postId: string) {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    }
}

export default new AdminService();
