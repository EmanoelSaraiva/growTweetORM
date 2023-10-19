"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const userRoutes = () => {
    const router = (0, express_1.Router)();
    const userController = new user_controller_1.UserController();
    router.get('/', auth_middleware_1.default, userController.index);
    router.post('/', user_middleware_1.userMiddlewareBodyCreatUser, userController.create);
    router.put('/:id', user_middleware_1.authMiddlewareUserPutDelete, user_middleware_1.userMiddlewareParams, userController.update);
    router.delete('/:id', user_middleware_1.authMiddlewareUserPutDelete, user_middleware_1.userMiddlewareParams, userController.delete);
    return router;
};
exports.userRoutes = userRoutes;
