import { repository } from '../database/prisma.database';
import { ResponseDto } from '../dtos/response.dto';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';

class UserService {
  public async findAll(): Promise<ResponseDto> {
    const data = await repository.user.findMany({
      include: {
        tweet: true,
        like: true,
      },
    });

    return {
      code: 200,
      message: 'Users listed',
      data,
    };
  }

  public async create(data: CreateUserDto): Promise<ResponseDto> {
    const verifUsernameEmail = await repository.user.findUnique({
      where: {
        email: data.email,
        username: data.username,
      },
    });

    if (!verifUsernameEmail) {
      return {
        code: 400,
        message: 'Incorrect data ',
      };
    }

    const newUser = new User(
      data.name,
      data.email,
      data.username,
      data.password,
    );

    const createdUser = await repository.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      },
    });

    return {
      code: 201,
      message: 'User created successfully',
      data: createdUser,
    };
  }
}

export default new UserService();
