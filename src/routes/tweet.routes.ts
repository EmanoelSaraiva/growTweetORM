import { Router } from 'express';
import { TweetController } from '../controllers/tweet.controller';
import { userMiddlewareBody } from '../middlewares/user.middleware';
import { tweetMiddlewareParams } from '../middlewares/tweet.middleware';
import {
  authMiddlewarePost,
  authMiddlewarePutDelet,
} from '../middlewares/tweet.middleware';
import authMiddleware from '../middlewares/auth.middleware';

export const tweetRoutes = () => {
  const router = Router();
  const tweetController = new TweetController();

  router.get('/', authMiddleware, tweetController.index);
  router.post(
    '/',
    [authMiddleware, authMiddlewarePost, userMiddlewareBody],
    tweetController.create,
  );
  router.put(
    '/:id',
    [authMiddleware, authMiddlewarePutDelet, tweetMiddlewareParams],
    tweetController.updated,
  );
  router.delete(
    '/:id',
    [authMiddleware, authMiddlewarePutDelet, tweetMiddlewareParams],
    tweetController.delete,
  );

  return router;
};
