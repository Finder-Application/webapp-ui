import { useQuery, UseQueryResult } from 'react-query';
import { IBaseUseQuery } from '../interfaces';
import { ResponseGetComments } from './interface';
import CommentService from './service';

const commentService = new CommentService();

const keyOfUesGetCommentsKey = 'uesGetComments';

type TComments = ResponseGetComments;
export const uesGetComments = (
  config: IBaseUseQuery<TComments>
): UseQueryResult<TComments> => {
  const { dependent, configQuery, query } = config;

  const response = useQuery<TComments>(
    [keyOfUesGetCommentsKey, ...dependent],
    () => commentService.getPagination(query),
    {
      ...configQuery,
    }
  );

  return response;
};
