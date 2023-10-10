import { Router } from 'express';
import { LikeController } from '../controllers/like.controller';

export const likeRoutes = () => {
  const router = Router();
  const likeController = new LikeController();

  router.get('/', likeController.index);
  router.post('/', likeController.create);

  return router;
};
