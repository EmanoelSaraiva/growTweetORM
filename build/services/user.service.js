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
const user_model_1 = require("../models/user.model");
class UserService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_database_1.repository.user.findMany({
                include: {
                    tweet: true,
                    like: true,
                    retweet: true,
                },
            });
            return {
                code: 200,
                message: 'Users listed',
                data,
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_model_1.User(data.name, data.email, data.username, data.password);
            const createdUser = yield prisma_database_1.repository.user.create({
                data: {
                    name: newUser.getName(),
                    email: newUser.getEmail(),
                    username: newUser.getUsername(),
                    password: newUser.getPassword(),
                },
            });
            return {
                code: 201,
                message: 'User created successfully',
                data: createdUser,
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_database_1.repository.user.delete({
                where: {
                    id,
                },
            });
            return {
                code: 200,
                message: 'User deleted successfully',
            };
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield prisma_database_1.repository.user.update({
                where: {
                    id: data.id,
                },
                data: {
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    token: data.token,
                },
            });
            return {
                code: 202,
                message: 'User updated successfully',
                data: updatedUser,
            };
        });
    }
    getByUsernameAndPassword(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = yield prisma_database_1.repository.user.findUnique({
                where: {
                    username: login,
                    password: password,
                },
            });
            if (username) {
                return username;
            }
            else {
                const email = yield prisma_database_1.repository.user.findUnique({
                    where: {
                        email: login,
                        password: password,
                    },
                });
                return email;
            }
        });
    }
    getByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUser = yield prisma_database_1.repository.user.findUnique({
                where: {
                    token: token,
                },
            });
            return tokenUser;
        });
    }
}
exports.default = new UserService();
