import { IFormatOptionQuery } from '@/utils/getPagiantion';
import { UseQueryOptions } from 'react-query';

export interface PaginationServicer<T> {
  getPagination: (query: IFormatOptionQuery) => Promise<T>;
}

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

export interface IBaseUseReactQuery<T> {
  dependent: [any];
  configQuery: UseQueryOptions<T>;
}

export interface IBaseUseQuery<T> extends IBaseUseReactQuery<T> {
  query: IFormatOptionQuery;
}

export interface IBaseUseMutation<T> extends IBaseUseReactQuery<T> {}
