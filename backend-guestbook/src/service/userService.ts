import {IUser, User} from "../entity/user";
import bcrypt from "bcryptjs";
import {sendResetPasswordEmail} from "../utility/emailService";
import * as crypto from "node:crypto";



class UserService {
    // Get user profile
    async getProfile(userId: string) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    // Update user profile
    async updateProfile(userId: string, username: string) {
        const user = await User.findByIdAndUpdate(userId,{username},{new:true});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    // Delete user account
    async deleteAccount(userId: string) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('User not found');
        }
    }

    // Generate password reset token
    async generatePasswordResetToken(email: string) {
        const user = await User.findOne({ email }) as IUser;
        if (!user) throw new Error('User not found');
        console.log('generate pswrd '+user);

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(resetToken, 10);

        user["resetPasswordToken"] = hash;
        user['resetPasswordExpire'] = new Date(Date.now() + 3600000); // 1 hour
        await user.save();

        const resetUrl = `http://localhost:4200/reset-password/${resetToken}`;
        await sendResetPasswordEmail(email, resetUrl);
    }

    // Reset password using the token
    async resetPassword(token: string, newPassword: string) {
        const user = await User.findOne({
            resetPasswordToken: { $exists: true },
            resetPasswordExpire: { $gt: Date.now() }
        }) as IUser;
        if (!user) throw new Error('Invalid or expired token');

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken!);
        if (!isTokenValid) throw new Error('Invalid or expired token');

        // Update password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
    }

}

export default new UserService();
