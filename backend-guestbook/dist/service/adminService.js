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
const user_1 = require("../entity/user");
const post_1 = require("../entity/post"); // Assuming you have a Post model
class AdminService {
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    }
    banUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.isBanned = true;
            yield user.save();
            return user;
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_1.Post.findByIdAndDelete(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        });
    }
}
exports.default = new AdminService();
//# sourceMappingURL=adminService.js.map