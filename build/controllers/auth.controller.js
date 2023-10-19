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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const uuid_1 = require("uuid");
const user_service_1 = __importDefault(require("../services/user.service"));
class AuthController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            const user = yield user_service_1.default.getByUsernameAndPassword(login, password);
            if (!user) {
                return res.status(401).send({ message: 'Username or password wrong' });
            }
            const token = (0, uuid_1.v4)();
            const update = yield user_service_1.default.update(Object.assign(Object.assign({}, user), { token: token }));
            const response = {
                code: 200,
                message: 'Login success',
                data: {
                    token: token,
                },
            };
            if (update.code === 202) {
                return res.status(response.code).send(response);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.headers;
            const user = yield user_service_1.default.getByToken(token);
            if (user) {
                const response = {
                    code: 200,
                    message: 'Logout success',
                };
                yield user_service_1.default.update(Object.assign(Object.assign({}, user), { token: null }));
                return res.status(response.code).send(response);
            }
            const response = {
                code: 404,
                message: 'Logout not found',
            };
            return res.status(response.code).send(response);
        });
    }
}
exports.AuthController = AuthController;
