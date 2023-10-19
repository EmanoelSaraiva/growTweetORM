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
const retweet_model_1 = require("../models/retweet.model");
class RetweetService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_database_1.repository.retweet.findMany({
                include: {
                    tweet: {
                        select: {
                            content: true,
                        },
                    },
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return {
                code: 200,
                message: 'Retweet listed',
                data,
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRetweet = new retweet_model_1.Retweet(data.userId, data.tweetId, data.content);
            yield prisma_database_1.repository.tweet.updateMany({
                data: {
                    type: 're-tweet',
                },
            });
            const createRetweet = yield prisma_database_1.repository.retweet.create({
                data: {
                    userId: newRetweet.userId,
                    tweetId: newRetweet.tweetId,
                    content: newRetweet.content,
                },
            });
            return {
                code: 201,
                message: 'Retweet created succcessfully',
                data: createRetweet,
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_database_1.repository.retweet.delete({
                where: {
                    id,
                },
            });
            return {
                code: 200,
                message: 'Re-tweet deleted successfully',
            };
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedRetweet = yield prisma_database_1.repository.retweet.update({
                where: {
                    id: data.id,
                },
                data: {
                    content: data.content,
                },
            });
            return {
                code: 202,
                message: 'Retweet updated successfully',
                data: updatedRetweet,
            };
        });
    }
}
exports.default = new RetweetService();
