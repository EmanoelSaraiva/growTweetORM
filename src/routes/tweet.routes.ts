import { Router } from 'express';
import { TweetController } from '../controllers/tweet.controller';
import { userMiddlewareBody } from '../middlewares/user.middleware';
import { tweetMiddlewareParams } from '../middlewares/tweet.middleware';

export const tweetRoutes = () => {
  const router = Router();
  const tweetController = new TweetController();

  router.get('/', tweetController.index);
  router.post('/', userMiddlewareBody, tweetController.create);
  router.put('/:id', tweetMiddlewareParams, tweetController.updated);
  router.delete('/:id', tweetMiddlewareParams, tweetController.delete);

  return router;
};
