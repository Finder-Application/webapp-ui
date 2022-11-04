import { UserEntity } from './User';

export interface Accounts {
  id: number;

  username: string;

  password: string;

  uuid: string;

  users: UserEntity[];
}
