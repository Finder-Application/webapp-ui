import { axiosClient } from '@/apis';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { FEATURE } from '../constants';
import {
  IBaseUseInfinities,
  IParamsDefault,
  TResponseList,
} from '../interfaces';
const getInfinitiesApi = <T, P>(
  params: P | IParamsDefault<{}>,
  feature: FEATURE,
  isPublic?: boolean
): Promise<TResponseList<T>> => {
  const baseUrl = `/api/${isPublic ? 'public' : 'private'}/${feature}`;
  params = params as IParamsDefault<{}>;
  const { optionKey, q: query } = params;
  return axiosClient.get(baseUrl, {
    params: {
      ...params,
      filter: JSON.stringify(params.filter),
      order:
        params.order && `${params.order?.field}:${params.order?.direction}`,
      q: query,
      ...optionKey,
    },
  });
};

export const useGetInfinities = <
  TResponse,
  Entity = any,
  Params = IParamsDefault<Entity>
>(
  config: IBaseUseInfinities<Params>
): UseInfiniteQueryResult<TResponseList<TResponse>> => {
  const {
    query_key,
    params,
    configApi: { feature: resource, isPublic, cacheTime },
  } = config;

  return useInfiniteQuery<TResponseList<TResponse>>(
    [query_key, params],

    async ({ pageParam = 1 }) => {
      const overrideParams = {
        page: pageParam,
        ...params,
      };
      return await getInfinitiesApi<TResponse, Params>(
        overrideParams,
        resource,
        isPublic
      );
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: cacheTime ?? 5 * 60 * 1000,
    }
  );
};
