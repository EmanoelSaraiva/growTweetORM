import { Router } from 'express';
import { TweetController } from '../controllers/tweet.controller';
import { userMiddlewareBody } from '../middlewares/user.middleware';
import { tweetMiddlewareParams } from '../middlewares/tweet.middleware';
import authMiddleware, {
  authMiddlewarePostPutDelet,
} from '../middlewares/auth.middleware';

export const tweetRoutes = () => {
  const router = Router();
  const tweetController = new TweetController();

  router.get('/', authMiddleware, tweetController.index);
  router.post(
    '/',
    [authMiddleware, authMiddlewarePostPutDelet, userMiddlewareBody],
    tweetController.create,
  );
  router.put(
    '/:id',
    [authMiddleware, authMiddlewarePostPutDelet, tweetMiddlewareParams],
    tweetController.updated,
  );
  router.delete(
    '/:id',
    [authMiddleware, authMiddlewarePostPutDelet, tweetMiddlewareParams],
    tweetController.delete,
  );

  return router;
};
