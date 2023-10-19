"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const express_1 = require("express");
const follow_controller_1 = require("../controllers/follow.controller");
const follow_middleware_1 = require("../middlewares/follow.middleware");
const followRouter = () => {
    const router = (0, express_1.Router)();
    const followController = new follow_controller_1.FollowController();
    router.get('/', followController.index);
    router.post('/', follow_middleware_1.followMiddlewareBody, followController.create);
    router.delete('/:id', follow_middleware_1.followMiddlewareParams, followController.delete);
    return router;
};
exports.followRouter = followRouter;
