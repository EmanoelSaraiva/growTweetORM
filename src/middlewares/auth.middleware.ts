import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        code: 401,
        message: 'Authentication token fail',
      });
    }

    const user = await userService.getByToken(token as string);

    if (!user) {
      return res.status(401).send({
        code: 401,
        message: 'Authentication token fail',
      });
    }

    req.body.userId = user.id;

    next();
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
}
