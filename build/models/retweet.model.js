"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retweet = void 0;
const uuid_1 = require("uuid");
class Retweet {
    constructor(userId, tweetId, content) {
        this.userId = userId;
        this.tweetId = tweetId;
        this.content = content;
        this.id = (0, uuid_1.v4)();
    }
}
exports.Retweet = Retweet;
