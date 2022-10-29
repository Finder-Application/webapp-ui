import { axiosClient } from '@/apis';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { FEATURE } from '../constants';
import {
  IBaseUseInfinities,
  IParamsDefault,
  ResponseSchema,
} from '../interfaces';
const infinitiesApi = <T, P>(
  params: P | IParamsDefault,
  feature: FEATURE,
  isPublic?: boolean
): Promise<ResponseSchema<T>> => {
  const baseUrl = `/api/${isPublic ? 'public' : 'private'}/${feature}`;
  if ('filter' in params) {
    params = params as IParamsDefault;
    return axiosClient.get(baseUrl, {
      params: {
        ...params,
        filter: JSON.stringify(params.filter),
        order: JSON.stringify(params.order),
      },
    });
  }
  return axiosClient.get(baseUrl, {
    params,
  });
};

export const uesGetInfinities = <T, E, Params = IParamsDefault<E>>(
  config: IBaseUseInfinities<Params>
): UseInfiniteQueryResult<ResponseSchema<T>> => {
  const {
    query_key: defineQUERY_KEY,
    params,
    configApi: { feature: resource, isPublic },
  } = config;

  return useInfiniteQuery<ResponseSchema<T>>(
    [defineQUERY_KEY],
    async () => infinitiesApi<T, Params>(params, resource, isPublic),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
      },
    }
  );
};
