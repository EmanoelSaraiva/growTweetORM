import { repository } from '../database/prisma.database';
import { LikeDto } from '../dtos/like.dto';
import { ResponseDto } from '../dtos/response.dto';
import { Like } from '../models/like.model';

class LikeService {
  public async findAll(): Promise<ResponseDto> {
    const data = await repository.like.findMany({
      include: {
        tweet: true,
      },
    });

    return {
      code: 200,
      message: 'Liked listed',
      data,
    };
  }

  public async create(data: LikeDto): Promise<ResponseDto> {
    const verifUserExist = await repository.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    const verifTweetExist = await repository.tweet.findUnique({
      where: {
        id: data.tweetId,
      },
    });

    if (!verifTweetExist && !verifUserExist) {
      return {
        code: 400,
        message: 'Not found tweet or user',
      };
    }

    const like = new Like(data.userId, data.tweetId);

    const createdLike = await repository.like.create({
      data: {
        userId: like.getUserId(),
        tweetId: like.getTweetId(),
      },
    });

    return {
      code: 201,
      message: 'Like tweet successfully',
      data: createdLike,
    };
  }
}

export default new LikeService();
