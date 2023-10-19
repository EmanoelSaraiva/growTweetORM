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
exports.authMiddlewareUserPutDelete = exports.userPasswordMiddleware = exports.userMiddlewareBodyCreatUser = exports.userMiddlewareParams = exports.userMiddlewareBody = void 0;
const prisma_database_1 = require("../database/prisma.database");
function userMiddlewareBody(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        try {
            const user = yield prisma_database_1.repository.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found',
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
exports.userMiddlewareBody = userMiddlewareBody;
function userMiddlewareParams(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield prisma_database_1.repository.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found',
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
exports.userMiddlewareParams = userMiddlewareParams;
function userMiddlewareBodyCreatUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, username, password } = req.body;
            const existingUser = yield prisma_database_1.repository.user.findFirst({
                where: {
                    OR: [
                        {
                            email: email,
                        },
                        {
                            username: username,
                        },
                    ],
                },
            });
            if (!name || !email || !username || !password) {
                return res.status(404).send({
                    ok: false,
                    message: 'Incorrect data',
                });
            }
            if (existingUser) {
                return res.status(404).send({
                    ok: false,
                    message: 'Username or email is already in use',
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
exports.userMiddlewareBodyCreatUser = userMiddlewareBodyCreatUser;
function userPasswordMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).send({
                ok: false,
                message: 'Username or password were not provided',
            });
        }
        next();
    });
}
exports.userPasswordMiddleware = userPasswordMiddleware;
function authMiddlewareUserPutDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const { id } = req.params;
        try {
            const user = yield prisma_database_1.repository.user.findUnique({
                where: {
                    id: id,
                },
            });
            const tokenUser = yield prisma_database_1.repository.user.findUnique({
                where: {
                    token: token,
                },
            });
            if ((tokenUser === null || tokenUser === void 0 ? void 0 : tokenUser.id) != (user === null || user === void 0 ? void 0 : user.id)) {
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
exports.authMiddlewareUserPutDelete = authMiddlewareUserPutDelete;
