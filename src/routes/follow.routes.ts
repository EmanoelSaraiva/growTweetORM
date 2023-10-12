import { Router } from 'express';
import { FollowController } from '../controllers/follow.controller';
import {
  followMiddlewareBody,
  followMiddlewareParams,
} from '../middlewares/follow.middleware';

export const followRouter = () => {
  const router = Router();
  const followController = new FollowController();

  router.get('/', followController.index);
  router.post('/', followMiddlewareBody, followController.create);
  router.delete('/:id', followMiddlewareParams, followController.delete);

  return router;
};
