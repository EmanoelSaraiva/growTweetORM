import { repository } from '../database/prisma.database';
import { ResponseDto } from '../dtos/response.dto';
import { RetweetDto, UpdateRetweetDto } from '../dtos/retweet.dto';
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

  public async delete(id: string): Promise<ResponseDto> {
    await repository.retweet.delete({
      where: {
        id,
      },
    });

    return {
      code: 200,
      message: 'Re-tweet deleted successfully',
    };
  }

  public async update(data: UpdateRetweetDto): Promise<ResponseDto> {
    const updatedRetweet = await repository.retweet.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 202,
      message: 'Retweet updated successfully',
      data: updatedRetweet,
    };
  }
}

export default new RetweetService();
