"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = __importDefault(require("../controller/userController"));
const router = (0, express_1.Router)();
router.get('/profile', authMiddleware_1.authMiddleware, userController_1.default.getProfile);
router.put('/profile', authMiddleware_1.authMiddleware, userController_1.default.updateProfile);
router.delete('/delete', authMiddleware_1.authMiddleware, userController_1.default.deleteAccount);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map