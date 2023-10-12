import { Request, Response } from 'express';
import tweetService from '../services/tweet.service';

export class TweetController {
  public async index(req: Request, res: Response) {
    const result = await tweetService.findAll();

    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { content, type, userId } = req.body;

      if (!content || !type || !userId) {
        return res.status(400).send({
          ok: false,
          message: 'Incorrect data',
        });
      }

      const result = await tweetService.create({
        content,
        types: type,
        userId,
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

  public async updated(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const result = await tweetService.update({
        id,
        content,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await tweetService.delete(id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
