import { v4 as uuid } from 'uuid';

export class Like {
  private id: string;

  constructor(private userId: string, private tweetId: string) {
    this.id = uuid();
  }

  public getUserId() {
    return this.userId;
  }

  public getTweetId() {
    return this.tweetId;
  }

  public getSave() {
    return {
      id: this.id,
      userId: this.userId,
      tweetId: this.tweetId,
    };
  }
}
