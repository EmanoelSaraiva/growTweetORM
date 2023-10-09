import { Request, Response } from 'express';
import userService from '../services/user.service';

export class UserController {
  public async index(req: Request, res: Response) {
    const result = await userService.findAll();

    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email, username, password } = req.body;

      if (!name || !email || !username || !password) {
        return res.status(400).send({
          ok: false,
          message: 'Incorrect data',
        });
      }

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
}
