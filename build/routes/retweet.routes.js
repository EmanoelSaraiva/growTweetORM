"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retweetRoutes = void 0;
const express_1 = require("express");
const retweet_controller_1 = require("../controllers/retweet.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
const tweet_middleware_1 = require("../middlewares/tweet.middleware");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const retweetRoutes = () => {
    const router = (0, express_1.Router)();
    const retweetController = new retweet_controller_1.RetweetController();
    router.get('/', auth_middleware_1.default, retweetController.index);
    router.post('/', [
        auth_middleware_1.default,
        user_middleware_1.userMiddlewareBody,
        tweet_middleware_1.tweetMiddlewareBody,
        tweet_middleware_1.retweetValidatedUser,
    ], retweetController.create);
    router.delete('/:id', [auth_middleware_1.default, tweet_middleware_1.authMiddlewareRetweetPutDelet], retweetController.delete);
    router.put('/:id', [auth_middleware_1.default, tweet_middleware_1.authMiddlewareRetweetPutDelet], retweetController.update);
    return router;
};
exports.retweetRoutes = retweetRoutes;
