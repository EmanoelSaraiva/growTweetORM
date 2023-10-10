import { NextFunction, Request, Response } from 'express';
import { repository } from '../database/prisma.database';

export async function userMiddlewareBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userId } = req.body;

  try {
    const user = await repository.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).send({
        ok: false,
        message: 'User not found',
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
