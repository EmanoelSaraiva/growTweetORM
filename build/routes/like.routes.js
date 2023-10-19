"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoutes = void 0;
const express_1 = require("express");
const like_controller_1 = require("../controllers/like.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const likeRoutes = () => {
    const router = (0, express_1.Router)();
    const likeController = new like_controller_1.LikeController();
    router.get('/', auth_middleware_1.default, likeController.index);
    router.post('/', auth_middleware_1.default, likeController.create);
    router.delete('/:id', auth_middleware_1.default, likeController.delete);
    return router;
};
exports.likeRoutes = likeRoutes;
