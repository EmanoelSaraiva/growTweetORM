import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import {
  authMiddlewareUserPutDelete,
  userMiddlewareBodyCreatUser,
  userMiddlewareParams,
} from '../middlewares/user.middleware';
import authMiddleware from '../middlewares/auth.middleware';

export const userRoutes = () => {
  const router = Router();
  const userController = new UserController();

  router.get('/', authMiddleware, userController.index);
  router.post('/', userMiddlewareBodyCreatUser, userController.create);
  router.put(
    '/:id',
    authMiddlewareUserPutDelete,
    userMiddlewareParams,
    userController.update,
  );
  router.delete('/:id', userMiddlewareParams, userController.delete);

  return router;
};
