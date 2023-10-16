import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { repository } from '../database/prisma.database';

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

    req.body.id = user.id;

    next();
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
}

export async function authMiddlewarePostPutDelet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  const { userId } = req.body;

  try {
    const user = await repository.user.findUnique({
      where: {
        token: token,
      },
    });

    const tweet = await repository.tweet.findFirst({
      where: {
        userId: userId,
      },
    });

    if (user?.id != tweet?.userId) {
      return res.status(403).send({
        ok: false,
        message: 'Not authorized',
      });
    }

    next();
  } catch (error: any) {
    res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
}
