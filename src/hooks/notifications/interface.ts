import { User } from '../auth/interface';

export interface PostNotis {
  id: number;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface CmtNotis extends Omit<PostNotis, 'title'> {}
