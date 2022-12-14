import { PostEntity } from './Post';

export interface UserEntity {
  id: number;

  accountId: number;

  firstName: string;

  middleName: string | null;

  lastName: string;

  isActive: boolean;

  avatar: string | null;

  social: string | null;

  phone: string | null;

  address: string | null;

  email: string | null;

  createdAt: Date;

  updatedAt: Date;

  posts: PostEntity[];
}
