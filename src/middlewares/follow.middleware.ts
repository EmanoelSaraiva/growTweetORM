import { NextFunction, Request, Response } from 'express';
import { repository } from '../database/prisma.database';

export async function followMiddlewareBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { followerId, followingId } = req.body;

  try {
    const follow = await repository.follow.findUnique({
      where: {
        followerId: followerId,
      },
    });

    if (follow) {
      return res.status(404).send({
        ok: false,
        message: 'You already follow this person',
      });
    }

    if (!followerId || !followingId) {
      return res.status(404).send({
        ok: false,
        message: 'Data not found',
      });
    }

    if (followerId === followingId) {
      return res.status(404).send({
        ok: false,
        message: 'You are not allowed to follow yourself',
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

export async function followMiddlewareParams(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;

  try {
    const follow = await repository.follow.findUnique({
      where: {
        id: id,
      },
    });

    if (!follow) {
      return res.status(404).send({
        ok: false,
        message: 'Follow not found',
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
