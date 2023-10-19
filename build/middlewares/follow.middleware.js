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
exports.followMiddlewareParams = exports.followMiddlewareBody = void 0;
const prisma_database_1 = require("../database/prisma.database");
function followMiddlewareBody(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { followerId, followingId } = req.body;
        try {
            const follow = yield prisma_database_1.repository.follow.findUnique({
                where: {
                    followerId: followerId,
                },
            });
            if (follow) {
                return res.status(404).send({
                    ok: false,
                    message: 'You already follow this person',
                });
            }
            if (!followerId || !followingId) {
                return res.status(404).send({
                    ok: false,
                    message: 'Data not found',
                });
            }
            if (followerId === followingId) {
                return res.status(404).send({
                    ok: false,
                    message: 'You are not allowed to follow yourself',
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
exports.followMiddlewareBody = followMiddlewareBody;
function followMiddlewareParams(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const follow = yield prisma_database_1.repository.follow.findUnique({
                where: {
                    id: id,
                },
            });
            if (!follow) {
                return res.status(404).send({
                    ok: false,
                    message: 'Follow not found',
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
exports.followMiddlewareParams = followMiddlewareParams;
