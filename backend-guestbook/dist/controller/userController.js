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
const userService_1 = __importDefault(require("../service/userService"));
class UserController {
    // Get user profile
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                const user = yield userService_1.default.getProfile(req.user.id);
                res.status(200).json({ user });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    // Update user profile
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            try {
                if (!req.user) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                const updatedUser = yield userService_1.default.updateProfile(req.user.id, username);
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ user: updatedUser, message: 'Username updated successfully' });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    // Delete user account
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: 'User not authenticated' });
                }
                yield userService_1.default.deleteAccount(req.user.id);
                res.status(200).json({ message: 'Account deleted successfully' });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map