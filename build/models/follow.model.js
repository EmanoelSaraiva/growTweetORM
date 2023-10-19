"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const uuid_1 = require("uuid");
class Follow {
    constructor(followerId, followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
        this.id = (0, uuid_1.v4)();
    }
}
exports.Follow = Follow;
