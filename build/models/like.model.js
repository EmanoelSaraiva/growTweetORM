"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const uuid_1 = require("uuid");
class Like {
    constructor(userId, tweetId) {
        this.userId = userId;
        this.tweetId = tweetId;
        this.id = (0, uuid_1.v4)();
    }
    getUserId() {
        return this.userId;
    }
    getTweetId() {
        return this.tweetId;
    }
    getSave() {
        return {
            id: this.id,
            userId: this.userId,
            tweetId: this.tweetId,
        };
    }
}
exports.Like = Like;
