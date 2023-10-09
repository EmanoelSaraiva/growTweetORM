import { repository } from '../database/prisma.database';
import { ResponseDto } from '../dtos/response.dto';
import { TweetDto, UpdateTweetDto } from '../dtos/tweet.dto';
import { Tweet } from '../models/tweet.model';

class TweetService {
  public async findAll(): Promise<ResponseDto> {
    const data = await repository.tweet.findMany();

    return {
      code: 200,
      message: 'Tweet listed',
      data,
    };
  }

  public async create(data: TweetDto): Promise<ResponseDto> {
    const verifUser = await repository.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!verifUser) {
      return {
        code: 400,
        message: 'User not exist',
      };
    }

    const newTweet = new Tweet(data.content, data.types, data.userId);

    const createTweet = await repository.tweet.create({
      data: {
        content: newTweet.content,
        type: newTweet.types,
        userId: newTweet.userId,
      },
    });

    return {
      code: 201,
      message: 'Tweet created succcessfully',
      data: createTweet,
    };
  }

  public async update(data: UpdateTweetDto): Promise<ResponseDto> {
    const verifTweetExist = await repository.tweet.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!verifTweetExist) {
      return {
        code: 400,
        message: 'Incorrect data',
      };
    }

    const updatedTweet = await repository.tweet.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 202,
      message: 'Tweet updated successfully',
      data: updatedTweet,
    };
  }
}

export default new TweetService();
