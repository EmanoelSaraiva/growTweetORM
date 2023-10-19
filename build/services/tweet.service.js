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
const tweet_model_1 = require("../models/tweet.model");
class TweetService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_database_1.repository.tweet.findMany({
                include: {
                    like: true,
                },
            });
            return {
                code: 200,
                message: 'Tweet listed',
                data,
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTweet = new tweet_model_1.Tweet(data.content, data.types, data.userId);
            const createTweet = yield prisma_database_1.repository.tweet.create({
                data: {
                    content: newTweet.content,
                    type: (newTweet.types = 'tweet'),
                    userId: newTweet.userId,
                },
            });
            return {
                code: 201,
                message: 'Tweet created succcessfully',
                data: createTweet,
            };
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTweet = yield prisma_database_1.repository.tweet.update({
                where: {
                    id: data.id,
                },
                data: {
                    content: data.content,
                },
            });
            return {
                code: 202,
                message: 'Tweet updated successfully',
                data: updatedTweet,
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_database_1.repository.like.deleteMany({
                where: {
                    tweetId: id,
                },
            });
            yield prisma_database_1.repository.retweet.deleteMany({
                where: {
                    tweetId: id,
                },
            });
            yield prisma_database_1.repository.tweet.delete({
                where: {
                    id,
                },
            });
            return {
                code: 200,
                message: 'Tweet deleted successfully',
            };
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const idTweet = yield prisma_database_1.repository.tweet.findUnique({
                where: {
                    id: id,
                },
            });
            return idTweet;
        });
    }
}
exports.default = new TweetService();
