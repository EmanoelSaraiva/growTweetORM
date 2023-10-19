"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetRoutes = void 0;
const express_1 = require("express");
const tweet_controller_1 = require("../controllers/tweet.controller");
const tweet_middleware_1 = require("../middlewares/tweet.middleware");
const tweet_middleware_2 = require("../middlewares/tweet.middleware");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const tweetRoutes = () => {
    const router = (0, express_1.Router)();
    const tweetController = new tweet_controller_1.TweetController();
    router.get('/', auth_middleware_1.default, tweetController.index);
    router.post('/', [auth_middleware_1.default], tweetController.create);
    router.put('/:id', [auth_middleware_1.default, tweet_middleware_2.authMiddlewarePutDelet, tweet_middleware_1.tweetMiddlewareParams], tweetController.updated);
    router.delete('/:id', [auth_middleware_1.default, tweet_middleware_2.authMiddlewarePutDelet, tweet_middleware_1.tweetMiddlewareParams], tweetController.delete);
    return router;
};
exports.tweetRoutes = tweetRoutes;
