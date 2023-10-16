export interface CreateUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  token?: string | null;
}
