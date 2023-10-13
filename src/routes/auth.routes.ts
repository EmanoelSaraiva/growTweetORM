import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { userPasswordMiddleware } from '../middlewares/user.middleware';

export const authRoutes = () => {
  const router = Router();
  const authController = new AuthController();

  router.post('/login', userPasswordMiddleware, authController.create);
  router.delete('/logout', authController.delete);

  return router;
};
