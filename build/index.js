"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./routes/user.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const swagger_json_1 = __importDefault(require("./swagger.json"));
const tweet_routes_1 = require("./routes/tweet.routes");
const like_routes_1 = require("./routes/like.routes");
const retweet_routes_1 = require("./routes/retweet.routes");
const follow_routes_1 = require("./routes/follow.routes");
const auth_routes_1 = require("./routes/auth.routes");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use('/user', (0, user_routes_1.userRoutes)());
app.use('/tweet', (0, tweet_routes_1.tweetRoutes)());
app.use('/like', (0, like_routes_1.likeRoutes)());
app.use('/retweet', (0, retweet_routes_1.retweetRoutes)());
app.use('/follow', (0, follow_routes_1.followRouter)());
app.use('/auth', (0, auth_routes_1.authRoutes)());
app.use('/', (req, res) => {
    res.status(200).send({
        ok: true,
        code: 200,
        message: 'Api Growtwitter',
    });
});
app.listen(3333, () => {
    console.log('API rodando');
});
