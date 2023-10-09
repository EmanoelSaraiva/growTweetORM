import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user.routes';
import swaaggerUi from 'swagger-ui-express';

const app = express();

import swaggerDocs from './swagger.json';
import { tweetRoutes } from './routes/tweet.routes';

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaaggerUi.serve, swaaggerUi.setup(swaggerDocs));

app.use('/user', userRoutes());
app.use('/tweet', tweetRoutes());

app.listen(3333, () => {
  console.log('API rodando na porta 3333');
});
