import { Response, Request } from 'express';
import retweetService from '../services/retweet.service';

export class RetweetController {
  public async index(req: Request, res: Response) {
    const result = await retweetService.findAll();

    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { userId, tweetId, content } = req.body;

      if (!userId || !tweetId) {
        return res.status(400).send({
          ok: false,
          message: 'Incorrect data',
        });
      }

      const result = await retweetService.create({
        userId,
        tweetId,
        content,
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
