import { repository } from '../database/prisma.database';
import { ResponseDto } from '../dtos/response.dto';
import { RetweetDto } from '../dtos/retweet.dto';
import { Retweet } from '../models/retweet.model';

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

  public async create(data: RetweetDto): Promise<ResponseDto> {
    const newRetweet = new Retweet(data.userId, data.tweetId, data.content!);

    await repository.tweet.updateMany({
      data: {
        type: 're-tweet',
      },
    });

    const createRetweet = await repository.retweet.create({
      data: {
        userId: newRetweet.userId,
        tweetId: newRetweet.tweetId,
        content: newRetweet.content,
      },
    });

    return {
      code: 201,
      message: 'Retweet created succcessfully',
      data: createRetweet,
    };
  }
}

export default new RetweetService();
