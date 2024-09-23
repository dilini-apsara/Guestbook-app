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
const adminService_1 = __importDefault(require("../service/adminService"));
class AdminController {
    // Delete a user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                yield adminService_1.default.deleteUser(userId);
                res.status(200).json({ message: 'User deleted successfully' });
            }
            catch (err) {
                res.status(err.message === 'User not found' ? 404 : 400).json({ message: err.message });
            }
        });
    }
    // Ban a user
    banUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                yield adminService_1.default.banUser(userId);
                res.status(200).json({ message: 'User banned successfully' });
            }
            catch (err) {
                res.status(err.message === 'User not found' ? 404 : 400).json({ message: err.message });
            }
        });
    }
    // Delete a post
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.params;
            try {
                yield adminService_1.default.deletePost(postId);
                res.status(200).json({ message: 'Post deleted successfully' });
            }
            catch (err) {
                res.status(err.message === 'Post not found' ? 404 : 400).json({ message: err.message });
            }
        });
    }
}
exports.default = new AdminController();
//# sourceMappingURL=adminController.js.map