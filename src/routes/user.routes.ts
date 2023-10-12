import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import {
  userMiddlewareBodyCreatUser,
  userMiddlewareParams,
} from '../middlewares/user.middleware';

export const userRoutes = () => {
  const router = Router();
  const userController = new UserController();

  router.get('/', userController.index);
  router.post('/', userMiddlewareBodyCreatUser, userController.create);
  router.put('/:id', userMiddlewareParams, userController.update);
  router.delete('/:id', userMiddlewareParams, userController.delete);

  return router;
};
