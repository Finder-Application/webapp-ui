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

export interface IParamsDefault<Field = {}> {
  page?: number;
  take?: number;
  order?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
  filter?: Filter<Field>[];
  optionKey?: {
    [key: string]: string;
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

export interface TResponseList<T> {
  data: T[];
  meta: Meta;
}

export interface IBaseUseQuery<T, Params = {}> {
  dependencies: [any];
  configQuery: UseQueryOptions<T>;
  query_key: QUERY_KEY;
  params: IParamsDefault<Params>;
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

export interface IBaseUseMutation<TResponse, TError, TVariables> {
  configMutation?: UseMutationOptions<TResponse, TError, TVariables>;
  resource: FEATURE;
  query_key?: QUERY_KEY;
  showToast?: boolean;
}
