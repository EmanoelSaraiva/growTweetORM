import { NextFunction, Request, Response } from 'express';
import { repository } from '../database/prisma.database';

export async function tweetMiddlewareParams(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;

  try {
    const tweet = await repository.tweet.findUnique({
      where: {
        id: id,
      },
    });

    if (!tweet) {
      return res.status(404).send({
        ok: false,
        message: 'Tweet not found',
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

export async function tweetMiddlewareBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { tweetId } = req.body;

  try {
    const tweet = await repository.tweet.findUnique({
      where: {
        id: tweetId,
      },
    });

    if (!tweet) {
      return res.status(404).send({
        ok: false,
        message: 'Tweet not found',
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

export async function retweetValidatedUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, tweetId } = req.body;

    const tweet = await repository.tweet.findUnique({
      where: {
        id: tweetId,
      },
      select: {
        userId: true,
      },
    });

    if (tweet?.userId === userId) {
      return res.status(404).send({
        ok: false,
        message: 'Can`t retweet your own tweet',
      });
    }

    next();
  } catch (error: any) {
    res.status(500).send({ ok: false, message: error.toString() });
  }
}

export async function authMiddlewarePutDelet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  const { id } = req.params;

  try {
    const tweetUser = await repository.tweet.findUnique({
      where: {
        id: id,
      },
    });

    const tokenUser = await repository.user.findUnique({
      where: {
        token: token,
      },
    });

    if (tweetUser?.userId != tokenUser?.id) {
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

export async function authMiddlewareRetweetPutDelet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    const retweetUser = await repository.retweet.findUnique({
      where: {
        id: id,
      },
    });

    const tokenUser = await repository.user.findUnique({
      where: {
        token: token,
      },
    });

    if (retweetUser?.userId != tokenUser?.id) {
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
