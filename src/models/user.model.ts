import { v4 as uuid } from 'uuid';

export class User {
  private id: string;

  constructor(
    private name: string,
    private email: string,
    private username: string,
    private password: string,
  ) {
    this.id = uuid();
    this.password = password;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getUsername() {
    return this.username;
  }

  public getPassword() {
    return this.password;
  }

  public getId() {
    return this.id;
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
