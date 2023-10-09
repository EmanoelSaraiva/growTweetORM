import { v4 as uuid } from 'uuid';

export class User {
  private id: string;

  constructor(
    public name: string,
    public email: string,
    public username: string,
    public password: string,
  ) {
    this.id = uuid();
    this.password = password;
  }

  public getPassword() {
    return this.password;
  }

  public getSave() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };
  }
}
