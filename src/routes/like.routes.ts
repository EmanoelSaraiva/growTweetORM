import { Router } from 'express';
import { LikeController } from '../controllers/like.controller';
import authMiddleware from '../middlewares/auth.middleware';

export const likeRoutes = () => {
  const router = Router();
  const likeController = new LikeController();

  router.get('/', authMiddleware, likeController.index);
  router.post('/', authMiddleware, likeController.create);
  router.delete('/:id', authMiddleware, likeController.delete);

  return router;
};
