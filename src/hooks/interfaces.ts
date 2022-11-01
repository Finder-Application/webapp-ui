import { IFormatOptionQuery } from '@/utils/getPagiantion.util';
import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { QUERY_KEY, RESOURCE } from './constants';

export interface Pagination<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IBaseUseQuery<T> {
  dependencies: [any];
  configQuery: UseQueryOptions<T>;
  defineQueryKey: QUERY_KEY;
  query: IFormatOptionQuery;
  configApi: {
    resource: RESOURCE;
    isPublic?: boolean;
  };
}

export interface IBaseUseInfinities {
  defineQueryKey: QUERY_KEY;
  query: IFormatOptionQuery;
  configApi: {
    resource: RESOURCE;
    isPublic?: boolean;
  };
}

export interface IBaseUseMutation<TResponse, TError, TVariables> {
  configMutation?: UseMutationOptions<TResponse, TError, TVariables>;
  resource: RESOURCE;
  defineQueryKey?: QUERY_KEY;
  showToast?: boolean;
}
