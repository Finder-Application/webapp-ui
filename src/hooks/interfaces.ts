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
  defineQUERY_KEY: QUERY_KEY;
  query: IFormatOptionQuery;
  configApi: {
    resource: RESOURCE;
    isPublic?: boolean;
  };
}

export interface IBaseUseInfinities {
  defineQUERY_KEY: QUERY_KEY;
  query: IFormatOptionQuery;
  configApi: {
    resource: RESOURCE;
    isPublic?: boolean;
  };
}

export interface IBaseUseMutationDelete<T> {
  configQuery: UseMutationOptions<T>;
  configApi: {
    resource: RESOURCE;
    itemId: string;
  };
  defineQUERY_KEY?: QUERY_KEY;
}

export interface IBaseUseMutationUpdate<TUpdate, TResponse> {
  configQuery: UseMutationOptions<TResponse>;
  configApi: {
    resource: RESOURCE;
    itemId: string;
    dataUpdate: TUpdate;
  };
  defineQUERY_KEY?: QUERY_KEY;
}

export interface IBaseUseMutationCreate<TCreate, TResponse> {
  configQuery: UseMutationOptions<TResponse>;
  configApi: {
    resource: RESOURCE;
    dataCreate: TCreate;
  };
  defineQUERY_KEY?: QUERY_KEY;
}
