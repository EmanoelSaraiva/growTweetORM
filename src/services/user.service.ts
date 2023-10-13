import { repository } from '../database/prisma.database';
import { ResponseDto } from '../dtos/response.dto';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';

class UserService {
  public async findAll(): Promise<ResponseDto> {
    const data = await repository.user.findMany({
      include: {
        tweet: true,
        like: true,
        retweet: true,
      },
    });

    return {
      code: 200,
      message: 'Users listed',
      data,
    };
  }

  public async create(data: CreateUserDto): Promise<ResponseDto> {
    const newUser = new User(
      data.name,
      data.email,
      data.username,
      data.password,
    );

    const createdUser = await repository.user.create({
      data: {
        name: newUser.getName(),
        email: newUser.getEmail(),
        username: newUser.getUsername(),
        password: newUser.getPassword(),
      },
    });

    return {
      code: 201,
      message: 'User created successfully',
      data: createdUser,
    };
  }

  public async delete(id: string): Promise<ResponseDto> {
    await repository.user.delete({
      where: {
        id,
      },
    });

    return {
      code: 200,
      message: 'User deleted successfully',
    };
  }

  public async update(data: UpdateUserDto): Promise<ResponseDto> {
    const updatedUser = await repository.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        token: data.token,
      },
    });

    return {
      code: 202,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  public async getByUsernameAndPassword(username: string, password: string) {
    const user = await repository.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });

    return user;
  }

  public async getByToken(token: string) {
    const tokenUser = await repository.user.findUnique({
      where: {
        token: token,
      },
    });

    return tokenUser;
  }
}

export default new UserService();
