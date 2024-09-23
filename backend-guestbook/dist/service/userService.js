"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_1 = require("../entity/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailService_1 = require("../utility/emailService");
const crypto = __importStar(require("node:crypto"));
class UserService {
    // Get user profile
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findById(userId).select('-password');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    }
    // Update user profile
    updateProfile(userId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByIdAndUpdate(userId, { username }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    }
    // Delete user account
    deleteAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
        });
    }
    // Generate password reset token
    generatePasswordResetToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ email });
            if (!user)
                throw new Error('User not found');
            console.log('generate pswrd ' + user);
            const resetToken = crypto.randomBytes(32).toString('hex');
            const hash = yield bcryptjs_1.default.hash(resetToken, 10);
            user["resetPasswordToken"] = hash;
            user['resetPasswordExpire'] = new Date(Date.now() + 3600000); // 1 hour
            yield user.save();
            const resetUrl = `http://localhost:4200/reset-password/${resetToken}`;
            yield (0, emailService_1.sendResetPasswordEmail)(email, resetUrl);
        });
    }
    // Reset password using the token
    resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({
                resetPasswordToken: { $exists: true },
                resetPasswordExpire: { $gt: Date.now() }
            });
            if (!user)
                throw new Error('Invalid or expired token');
            const isTokenValid = yield bcryptjs_1.default.compare(token, user.resetPasswordToken);
            if (!isTokenValid)
                throw new Error('Invalid or expired token');
            // Update password
            const salt = yield bcryptjs_1.default.genSalt(10);
            user.password = yield bcryptjs_1.default.hash(newPassword, salt);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            yield user.save();
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map