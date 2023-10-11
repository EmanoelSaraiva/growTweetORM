import { v4 as uuid } from 'uuid';

export class Follow {
  private id: string;

  constructor(public followerId: string, public followingId: string) {
    this.id = uuid();
  }
}
