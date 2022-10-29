import { axiosClient } from '@/apis';
import {
  formatOptionQuery,
  IFormatOptionQuery,
} from '@/utils/getPagiantion.util';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { RESOURCE } from '../constants';
import { IBaseUseInfinities, Pagination } from '../interfaces';

const getPagination = <T>(
  query: IFormatOptionQuery,
  resource: RESOURCE,
  isPublic?: boolean
): Promise<Pagination<T>> => {
  const baseUrl = `/api/${isPublic ? 'public' : 'private'}/${resource}`;

  return axiosClient.get(baseUrl + formatOptionQuery(query));
};

export const uesGetInfinities = <T>(
  config: IBaseUseInfinities
): UseInfiniteQueryResult<Pagination<T>> => {
  const { defineQueryKey, query, configApi } = config;

  return useInfiniteQuery<Pagination<T>>(
    [defineQueryKey],
    async ({ pageParam = 1 }) => {
      const overrideQuery = {
        ...query,
        page: pageParam,
        take: query.take ?? 20,
      };
      return await getPagination<T>(
        overrideQuery,
        configApi.resource,
        configApi.isPublic
      );
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
      },
    }
  );
};
