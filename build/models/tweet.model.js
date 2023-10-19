"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const uuid_1 = require("uuid");
class Tweet {
    constructor(content, types, userId) {
        this.content = content;
        this.types = types;
        this.userId = userId;
        this.id = (0, uuid_1.v4)();
    }
    getSave() {
        return {
            id: this.id,
            types: this.types,
            content: this.content,
            userId: this.userId,
        };
    }
}
exports.Tweet = Tweet;
