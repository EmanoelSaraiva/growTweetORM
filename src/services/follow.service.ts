import { repository } from '../database/prisma.database';
import { FollowDto } from '../dtos/follow.dto';
import { ResponseDto } from '../dtos/response.dto';
import { Follow } from '../models/follow.model';

class FollowService {
  public async findAll(): Promise<ResponseDto> {
    const data = await repository.follow.findMany({
      include: {
        follower: {
          select: {
            name: true,
          },
        },
        following: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      code: 200,
      message: 'Follows listed',
      data,
    };
  }

  public async create(data: FollowDto): Promise<ResponseDto> {
    const newFollow = new Follow(data.followerId, data.followingId);

    const createFollow = await repository.follow.create({
      data: {
        followerId: newFollow.followerId,
        followingId: newFollow.followingId,
      },
    });

    return {
      code: 201,
      message: 'Following successfully',
      data: createFollow,
    };
  }

  public async delete(id: string): Promise<ResponseDto> {
    await repository.follow.delete({
      where: {
        id: id,
      },
      select: {
        followerId: true,
      },
    });

    return {
      code: 200,
      message: 'Unfollow successfully',
    };
  }
}

export default new FollowService();
