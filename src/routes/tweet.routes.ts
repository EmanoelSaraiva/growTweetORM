import { Router } from 'express';
import { TweetController } from '../controllers/tweet.controller';

export const tweetRoutes = () => {
  const router = Router();
  const tweetController = new TweetController();

  router.get('/', tweetController.index);
  router.post('/', tweetController.create);
  router.put('/:id', tweetController.updated);
  router.delete('/:id', tweetController.delete);

  return router;
};
