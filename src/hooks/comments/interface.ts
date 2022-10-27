import { User } from '../auth/interface';
import { Pagination } from '../interfaces';

export interface Comment {
  id: number;
  postId: number;
  photo: null;
  content: string;
  likes: number;
  user: User;
  child: ChildComment[];
}

export interface ChildComment {
  id: number;
  repFor: number;
  photo: null;
  content: string;
  likes: number;
  user: User;
}

export interface ResponseGetComments extends Pagination<Comment> {}
