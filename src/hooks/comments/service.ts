import { axiosClient } from '@/apis';
import { formatOptionQuery, IFormatOptionQuery } from '@/utils/getPagiantion';
import { format } from 'path';
import { PaginationServicer } from '../interfaces';
import { ResponseGetComments } from './interface';

class CommentService implements PaginationServicer<ResponseGetComments> {
  basePublicURL: string = '/public/comments';
  getPagination(query: IFormatOptionQuery): Promise<ResponseGetComments> {
    return axiosClient.get(this.basePublicURL + formatOptionQuery(query));
  }
}
export default CommentService;
