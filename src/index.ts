import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user.routes';
import swaaggerUi from 'swagger-ui-express';

const app = express();

import swaggerDocs from './swagger.json';
import { tweetRoutes } from './routes/tweet.routes';
import { likeRoutes } from './routes/like.routes';
import { retweetRoutes } from './routes/retweet.routes';
import { followRouter } from './routes/follow.routes';
import { authRoutes } from './routes/auth.routes';

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaaggerUi.serve, swaaggerUi.setup(swaggerDocs));

app.use('/user', userRoutes());
app.use('/tweet', tweetRoutes());
app.use('/like', likeRoutes());
app.use('/retweet', retweetRoutes());
app.use('/follow', followRouter());
app.use('/auth', authRoutes());

app.listen(3333, () => {
  console.log('API rodando na porta 3333');
});
