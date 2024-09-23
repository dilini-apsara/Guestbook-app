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
class UserService {
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findById(userId).select('-password');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    }
    updateProfile(userId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByIdAndUpdate(userId, { username }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    }
    deleteAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map