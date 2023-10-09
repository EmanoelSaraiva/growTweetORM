import { v4 as uuid } from 'uuid';

export class Tweet {
  private id: string;

  constructor(
    public content: string,
    public types: string,
    public userId: string,
  ) {
    this.id = uuid();
  }

  public getSave() {
    return {
      id: this.id,
      types: this.types,
      content: this.content,
      userId: this.userId,
    };
  }
}
