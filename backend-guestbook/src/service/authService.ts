import jwt from 'jsonwebtoken';
import {IUser, User} from "../entity/user";


class AuthService {
    // Login service
    async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({ email }) as IUser;
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
        return token;
    }

    // Register service
    async register(username:string,email: string, password: string) {
        const user = new User({ username,email, password });
        await user.save();
        return user;
    }
}

export default new AuthService();
