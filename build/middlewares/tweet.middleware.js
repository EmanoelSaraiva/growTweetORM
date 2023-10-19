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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareRetweetPutDelet = exports.authMiddlewarePutDelet = exports.retweetValidatedUser = exports.tweetMiddlewareBody = exports.tweetMiddlewareParams = void 0;
const prisma_database_1 = require("../database/prisma.database");
function tweetMiddlewareParams(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const tweet = yield prisma_database_1.repository.tweet.findUnique({
                where: {
                    id: id,
                },
            });
            if (!tweet) {
                return res.status(404).send({
                    ok: false,
                    message: 'Tweet not found',
                });
            }
            next();
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    });
}
exports.tweetMiddlewareParams = tweetMiddlewareParams;
function tweetMiddlewareBody(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tweetId } = req.body;
        try {
            const tweet = yield prisma_database_1.repository.tweet.findUnique({
                where: {
                    id: tweetId,
                },
            });
            if (!tweet) {
                return res.status(404).send({
                    ok: false,
                    message: 'Tweet not found',
                });
            }
            next();
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    });
}
exports.tweetMiddlewareBody = tweetMiddlewareBody;
function retweetValidatedUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, tweetId } = req.body;
            const tweet = yield prisma_database_1.repository.tweet.findUnique({
                where: {
                    id: tweetId,
                },
                select: {
                    userId: true,
                },
            });
            if ((tweet === null || tweet === void 0 ? void 0 : tweet.userId) === userId) {
                return res.status(404).send({
                    ok: false,
                    message: 'Can`t retweet your own tweet',
                });
            }
            next();
        }
        catch (error) {
            res.status(500).send({ ok: false, message: error.toString() });
        }
    });
}
exports.retweetValidatedUser = retweetValidatedUser;
function authMiddlewarePutDelet(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const { id } = req.params;
        try {
            const tweetUser = yield prisma_database_1.repository.tweet.findUnique({
                where: {
                    id: id,
                },
            });
            const tokenUser = yield prisma_database_1.repository.user.findUnique({
                where: {
                    token: token,
                },
            });
            if ((tweetUser === null || tweetUser === void 0 ? void 0 : tweetUser.userId) != (tokenUser === null || tokenUser === void 0 ? void 0 : tokenUser.id)) {
                return res.status(403).send({
                    ok: false,
                    message: 'Not authorized to access this tweet',
                });
            }
            next();
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    });
}
exports.authMiddlewarePutDelet = authMiddlewarePutDelet;
function authMiddlewareRetweetPutDelet(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const { id } = req.params;
        try {
            const retweetUser = yield prisma_database_1.repository.retweet.findUnique({
                where: {
                    id: id,
                },
            });
            const tokenUser = yield prisma_database_1.repository.user.findUnique({
                where: {
                    token: token,
                },
            });
            if ((retweetUser === null || retweetUser === void 0 ? void 0 : retweetUser.userId) != (tokenUser === null || tokenUser === void 0 ? void 0 : tokenUser.id)) {
                return res.status(403).send({
                    ok: false,
                    message: 'Not authorized to access this tweet',
                });
            }
            next();
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    });
}
exports.authMiddlewareRetweetPutDelet = authMiddlewareRetweetPutDelet;
