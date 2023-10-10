import { Request, Response } from 'express';
import likeService from '../services/like.service';

export class LikeController {
  public async index(req: Request, res: Response) {
    const result = await likeService.findAll();

    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { userId, tweetId } = req.body;

      if (!userId || !tweetId) {
        return res.status(400).send({
          ok: false,
          message: 'Incorrect data',
        });
      }

      const result = await likeService.create({
        userId,
        tweetId,
      });

      return res.status(201).send({
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
