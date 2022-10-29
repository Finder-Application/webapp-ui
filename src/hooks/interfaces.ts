import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { QUERY_KEY, FEATURE } from './constants';
enum Operator {
  IsNull = 'ISNULL',
  ILike = 'ILIKE',
  Like = 'LIKE',
  Equal = 'EQUAL',
  MoreThanOrEqual = 'MORETHANOREQUAL',
  MoreThan = 'MORETHAN',
  LessThanOrEqual = 'LESSTHANOREQUAL',
  LessThan = 'LESSTHAN',
  Not = 'NOT',
}

interface Filter<Field> {
  field: keyof Field;
  operator: Operator;
  value: string;
}

export interface IParamsDefault<F = {}> {
  page?: number;
  take?: number;
  order?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
  filter?: Filter<F>[];
  optionKey?: {
    key: string;
    value: string;
  };
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ResponseSchema<T> {
  data: T[];
  meta: Meta;
}

export interface IBaseUseQuery<T> {
  dependencies: [any];
  configQuery: UseQueryOptions<T>;
  query_key: QUERY_KEY;
  params: IParamsDefault;
  configApi: {
    resource: FEATURE;
    isPublic?: boolean;
  };
}

export interface IBaseUseInfinities<Params> {
  query_key: QUERY_KEY;
  params: Params;
  configApi: {
    feature: FEATURE;
    isPublic?: boolean;
  };
}

interface ConfigApi<Data> {
  feature: FEATURE;
  data: Data;
  id: string;
}
interface BaseMMutation<Response, Key extends string = '', Data = {}> {
  configQuery: UseMutationOptions<Response>;
  configApi: Omit<ConfigApi<Data>, Key>;
  query_key?: QUERY_KEY;
}

export type IBaseUseMutationDelete<Response> = BaseMMutation<Response, 'data'>;
export type IBaseUseMutationUpdate<TUpdate, TResponse> = BaseMMutation<
  TUpdate,
  '',
  TResponse
>;
export type IBaseUseMutationCreate<TCreate, TResponse> = BaseMMutation<
  TResponse,
  'id',
  TCreate
>;
