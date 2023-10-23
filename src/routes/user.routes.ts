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
  router.post('/create', userMiddlewareBodyCreatUser, userController.create);
  router.put(
    '/:id',
    authMiddlewareUserPutDelete,
    userMiddlewareParams,
    userController.update,
  );
  router.delete(
    '/:id',
    authMiddlewareUserPutDelete,
    userMiddlewareParams,
    userController.delete,
  );

  return router;
};
