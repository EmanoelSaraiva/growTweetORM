import { Router } from 'express';
import { RetweetController } from '../controllers/retweet.controller';
import { userMiddlewareBody } from '../middlewares/user.middleware';
import {
  authMiddlewareRetweetPutDelet,
  retweetValidatedUser,
  tweetMiddlewareBody,
} from '../middlewares/tweet.middleware';
import authMiddleware from '../middlewares/auth.middleware';

export const retweetRoutes = () => {
  const router = Router();
  const retweetController = new RetweetController();

  router.get('/', authMiddleware, retweetController.index);
  router.post(
    '/',
    [
      authMiddleware,
      userMiddlewareBody,
      tweetMiddlewareBody,
      retweetValidatedUser,
    ],
    retweetController.create,
  );
  router.delete(
    '/:id',
    [authMiddleware, authMiddlewareRetweetPutDelet],
    retweetController.delete,
  );
  router.put(
    '/:id',
    [authMiddleware, authMiddlewareRetweetPutDelet],
    retweetController.update,
  );

  return router;
};
