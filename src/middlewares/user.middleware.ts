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

export async function userPasswordMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send({
      ok: false,
      message: 'Username or password were not provided',
    });
  }

  next();
}

export async function authMiddlewareUserPutDelete(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  const { id } = req.params;

  try {
    const user = await repository.user.findUnique({
      where: {
        id: id,
      },
    });

    const tokenUser = await repository.user.findUnique({
      where: {
        token: token,
      },
    });

    if (tokenUser?.id != user?.id) {
      return res.status(403).send({
        ok: false,
        message: 'Not authorized to access this tweet',
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
