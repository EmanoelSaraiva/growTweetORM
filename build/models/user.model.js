"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(name, email, username, password) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.id = (0, uuid_1.v4)();
        this.password = password;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getId() {
        return this.id;
    }
    getSave() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
        };
    }
}
exports.User = User;
