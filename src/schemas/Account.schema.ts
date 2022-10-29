import { UserSchema } from './User.schema';

export interface Accounts {
  id: number;

  username: string;

  password: string;

  uuid: string;

  users: UserSchema[];
}
