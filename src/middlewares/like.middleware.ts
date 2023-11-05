import { NextFunction, Response, Request } from 'express';
import { repository } from '../database/prisma.database';

export async function likeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userId, tweetId } = req.body;

  try {
    const tweet = await repository.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        like: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!tweet) {
      return res.status(404).send({
        ok: false,
        message: 'Tweet not found',
      });
    }

    if (tweet.like.length > 0) {
      return res.status(400).send({
        ok: false,
        message: 'You have already liked this tweet',
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
