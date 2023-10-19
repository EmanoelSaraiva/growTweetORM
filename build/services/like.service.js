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
const prisma_database_1 = require("../database/prisma.database");
const like_model_1 = require("../models/like.model");
class LikeService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_database_1.repository.like.findMany({
                include: {
                    tweet: true,
                },
            });
            return {
                code: 200,
                message: 'Liked listed',
                data,
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifUserExist = yield prisma_database_1.repository.user.findUnique({
                where: {
                    id: data.userId,
                },
            });
            const verifTweetExist = yield prisma_database_1.repository.tweet.findUnique({
                where: {
                    id: data.tweetId,
                },
            });
            if (!verifTweetExist && !verifUserExist) {
                return {
                    code: 400,
                    message: 'Not found tweet or user',
                };
            }
            const like = new like_model_1.Like(data.userId, data.tweetId);
            const createdLike = yield prisma_database_1.repository.like.create({
                data: {
                    userId: like.getUserId(),
                    tweetId: like.getTweetId(),
                },
            });
            return {
                code: 201,
                message: 'Like tweet successfully',
                data: createdLike,
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_database_1.repository.like.delete({
                where: {
                    id,
                },
            });
            return {
                code: 200,
                message: 'Successfully dropped',
            };
        });
    }
}
exports.default = new LikeService();
