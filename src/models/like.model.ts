import { v4 as uuid } from 'uuid';

export class Like {
  private id: string;

  constructor(public userId: string, public tweetId: string) {
    this.id = uuid();
  }

  public getSave() {
    return {
      id: this.id,
      userId: this.userId,
      tweetId: this.tweetId,
    };
  }
}
