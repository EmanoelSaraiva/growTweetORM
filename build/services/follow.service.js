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
const follow_model_1 = require("../models/follow.model");
class FollowService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_database_1.repository.follow.findMany({
                include: {
                    follower: {
                        select: {
                            name: true,
                        },
                    },
                    following: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return {
                code: 200,
                message: 'Follows listed',
                data,
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFollow = new follow_model_1.Follow(data.followerId, data.followingId);
            const createFollow = yield prisma_database_1.repository.follow.create({
                data: {
                    followerId: newFollow.followerId,
                    followingId: newFollow.followingId,
                },
            });
            return {
                code: 201,
                message: 'Following successfully',
                data: createFollow,
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_database_1.repository.follow.delete({
                where: {
                    id: id,
                },
                select: {
                    followerId: true,
                },
            });
            return {
                code: 200,
                message: 'Unfollow successfully',
            };
        });
    }
}
exports.default = new FollowService();
