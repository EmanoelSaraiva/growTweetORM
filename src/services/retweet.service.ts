import { repository } from '../database/prisma.database';
import { ResponseDto } from '../dtos/response.dto';

class RetweetService {
  public async findAll(): Promise<ResponseDto> {
    const data = await repository.retweet.findMany({
      include: {
        tweet: {
          select: {
            content: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      code: 200,
      message: 'Retweet listed',
      data,
    };
  }

  public async create(data: ResponseDto) {}
}

export default new RetweetService();
