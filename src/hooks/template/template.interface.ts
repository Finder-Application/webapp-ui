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

interface Filter<T> {
  field: keyof T;
  operator: Operator;
  value: string;
}

export interface ITemplateQuery<T> {
  page?: number;
  take?: number;
  order?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
  filter?: Filter<T>[];
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface TemplateResponse<T> {
  data: T[];
  meta: Meta;
}
