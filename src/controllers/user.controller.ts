import { Request, Response } from 'express';
import userService from '../services/user.service';

export class UserController {
  public async index(req: Request, res: Response) {
    const result = await userService.findAll();

    return res.status(result.code).send(result);
  }

  public async searchUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await userService.getUserId(id);
      return res.status(result.code).send({ result });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email, username, password } = req.body;

      const result = await userService.create({
        name,
        email,
        username,
        password,
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

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await userService.delete(id);

      return res.status(result.code).send({ result });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, username, password } = req.body;

      const result = await userService.update({
        id,
        name,
        email,
        username,
        password,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
