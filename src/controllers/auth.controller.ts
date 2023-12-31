import { Request, Response } from 'express';
import { v4 as tokenGen } from 'uuid';
import userService from '../services/user.service';
import { ResponseDto } from '../dtos/response.dto';

export default class AuthController {
  public async create(req: Request, res: Response) {
    const { login, password } = req.body;

    const user = await userService.getByUsernameAndPassword(login, password);

    if (!user) {
      return res.status(401).send({ message: 'Username or password wrong' });
    }

    const token = tokenGen();

    const update = await userService.update({ ...user, token: token });

    const response: ResponseDto = {
      code: 200,
      message: 'Login success',
      data: {
        token: token,
      },
    };

    if (update.code === 202) {
      return res.status(response.code).send(response);
    }
  }

  public async delete(req: Request, res: Response) {
    const token = req.headers.authorization;

    const user = await userService.getByToken(token as string);

    if (user) {
      const response: ResponseDto = {
        code: 200,
        message: 'Logout success',
      };

      await userService.update({ ...user, token: null });

      return res.status(response.code).send(response);
    } else {
      const response: ResponseDto = {
        code: 404,
        message: 'Logout not found',
      };

      return res.status(response.code).send(response);
    }
  }
}
