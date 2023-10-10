import { Router } from 'express';
import { RetweetController } from '../controllers/retweet.controller';
import { userMiddlewareBody } from '../middlewares/user.middleware';
import {
  retweetValidatedUser,
  tweetMiddlewareBody,
} from '../middlewares/tweet.middleware';

export const retweetRoutes = () => {
  const router = Router();
  const retweetController = new RetweetController();

  router.get('/', retweetController.index);
  router.post(
    '/',
    userMiddlewareBody,
    tweetMiddlewareBody,
    retweetValidatedUser,
    retweetController.create,
  );

  return router;
};
