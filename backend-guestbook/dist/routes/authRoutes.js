"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const authController_1 = __importDefault(require("../controller/authController"));
const router = (0, express_1.Router)();
dotenv_1.default.config();
console.log('auth ' + process.env.MONGO_URI);
router.post('/register', authController_1.default.register);
router.post('/login', authController_1.default.login);
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Auth route is working!' });
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map