"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const adminController_1 = __importDefault(require("../controller/adminController"));
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.use('/admin', adminMiddleware_1.adminMiddleware);
router.delete('/users/:userId', adminController_1.default.deleteUser);
router.patch('/users/:userId/ban', adminController_1.default.banUser);
router.delete('/posts/:postId', adminController_1.default.deletePost);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map