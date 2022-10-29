import { IFormatOptionQuery } from '@/utils/getPagiantion.util';
import { uesGetInfinities } from '../common/uesGetInfinities';
import { QUERY_KEY, RESOURCE } from '../constants';
import { Comment } from './interface';

export const uesGetInfiComments = (query: IFormatOptionQuery) =>
  uesGetInfinities<Comment>({
    defineQUERY_KEY: QUERY_KEY.PAGINATION_COMMENTS,
    query,
    configApi: {
      resource: RESOURCE.COMMENT,
      isPublic: true,
    },
  });
