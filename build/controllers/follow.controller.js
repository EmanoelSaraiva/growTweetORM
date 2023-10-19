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
exports.FollowController = void 0;
const follow_service_1 = __importDefault(require("../services/follow.service"));
class FollowController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield follow_service_1.default.findAll();
            return res.status(result.code).send(result);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followerId, followingId } = req.body;
                const result = yield follow_service_1.default.create({
                    followerId,
                    followingId,
                });
                return res.status(201).send({
                    data: result,
                });
            }
            catch (error) {
                res.status(500).send({
                    ok: false,
                    message: error.toString(),
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield follow_service_1.default.delete(id);
                return res.status(result.code).send(result);
            }
            catch (error) {
                res.status(500).send({
                    ok: false,
                    message: error.toString(),
                });
            }
        });
    }
}
exports.FollowController = FollowController;
