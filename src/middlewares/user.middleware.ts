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

export async function userMiddlewareParams(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;

  try {
    const user = await repository.user.findUnique({
      where: {
        id: id,
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

export async function userMiddlewareBodyCreatUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, username, password } = req.body;

    const existingUser = await repository.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });

    if (!name || !email || !username || !password) {
      return res.status(404).send({
        ok: false,
        message: 'Incorrect data',
      });
    }

    if (existingUser) {
      return res.status(404).send({
        ok: false,
        message: 'Username or email is already in use',
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
