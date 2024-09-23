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
const authService_1 = __importDefault(require("../service/authService"));
const user_1 = require("../entity/user");
class AuthController {
    // Login controller
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield authService_1.default.login(email, password);
                res.status(200).json({ token });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    // Register controller
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            try {
                const existingUser = yield user_1.User.findOne({ email });
                if (existingUser) {
                    return res.status(409).json({ message: 'User already registered' });
                }
                const user = yield authService_1.default.register(username, email, password);
                res.status(201).json({ user });
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map