import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRoutes = () => {
  const router = Router();
  const userController = new UserController();

  router.get('/', userController.index);
  router.post('/', userController.create);

  return router;
};
