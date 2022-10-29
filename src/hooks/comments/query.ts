import { IFormatOptionQuery } from '@/utils/getPagiantion.util';
import { uesGetInfinities } from '../common/useGetInfinities';
import { QUERY_KEY, FEATURE } from '../constants';
import { Comment } from './interface';

export const uesGetInfiComments = (params: IFormatOptionQuery) =>
  uesGetInfinities<Comment>({
    query_key: QUERY_KEY.PAGINATION_COMMENTS,
    params,
    configApi: {
      feature: FEATURE.COMMENT,
      isPublic: true,
    },
  });
