import { useGetInfinities } from '../common/useGetInfinities';
import { FEATURE, QUERY_KEY } from '../constants';
import { IParamsDefault } from '../interfaces';
import { CmtNotis, PostNotis } from './interface';

export const uesGetInfiPostNotis = (params: IParamsDefault) =>
  useGetInfinities<PostNotis>({
    query_key: QUERY_KEY.PAGINATION_POST_NOTIS,
    params,
    configApi: {
      feature: FEATURE.POST_NOTIS,
      isPublic: false,
    },
  });

export const uesGetInfiCmtNotis = (params: IParamsDefault) =>
  useGetInfinities<CmtNotis>({
    query_key: QUERY_KEY.PAGINATION_CMT_NOTIS,
    params,
    configApi: {
      feature: FEATURE.COMMENT_NOTIS,
      isPublic: false,
    },
  });
