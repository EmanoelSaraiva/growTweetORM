import { repository } from '../database/prisma.database';
import { ResponseDto } from '../dtos/response.dto';
import { TweetDto, UpdateTweetDto } from '../dtos/tweet.dto';
import { Tweet } from '../models/tweet.model';

class TweetService {
  public async findAll(): Promise<ResponseDto> {
    const data = await repository.tweet.findMany({
      include: {
        like: true,
      },
    });

    return {
      code: 200,
      message: 'Tweet listed',
      data,
    };
  }

  public async create(data: TweetDto): Promise<ResponseDto> {
    const newTweet = new Tweet(data.content, data.types, data.userId);

    const createTweet = await repository.tweet.create({
      data: {
        content: newTweet.content,
        type: (newTweet.types = 'tweet'),
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

  public async delete(id: string): Promise<ResponseDto> {
    await repository.like.deleteMany({
      where: {
        tweetId: id,
      },
    });

    await repository.retweet.deleteMany({
      where: {
        tweetId: id,
      },
    });

    await repository.tweet.delete({
      where: {
        id,
      },
    });

    return {
      code: 200,
      message: 'Tweet deleted successfully',
    };
  }

  public async getId(id: string) {
    const idTweet = await repository.tweet.findUnique({
      where: {
        id: id,
      },
    });

    return idTweet;
  }
}

export default new TweetService();
