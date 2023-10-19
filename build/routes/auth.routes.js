"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
const authRoutes = () => {
    const router = (0, express_1.Router)();
    const authController = new auth_controller_1.AuthController();
    router.post('/login', user_middleware_1.userPasswordMiddleware, authController.create);
    router.delete('/logout', authController.delete);
    return router;
};
exports.authRoutes = authRoutes;
