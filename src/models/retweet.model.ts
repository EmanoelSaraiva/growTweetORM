import { v4 as uuid } from 'uuid';

export class Retweet {
  private id: string;

  constructor(public userId: string, public tweetId: string, public content?: string) {
    this.id = uuid();
  }
}
