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

interface Filter {
  field: string;
  operator: Operator;
  value: string;
}

export interface IFormatOptionQuery {
  page?: number;
  take?: number;
  order?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
  filter?: Filter[];
  optionKey?: {
    key: string;
    value: string;
  };
}

const DEFAULT_PAGE = 1;
const DEFAULT_TAKE = 20;

export const formatOptionQuery = (option: IFormatOptionQuery): string => {
  const { page, take, order, filter, optionKey } = option;

  const query = new URLSearchParams();

  optionKey && query.append(optionKey.key, optionKey.value);

  query.append('page', page ? page.toString() : DEFAULT_PAGE.toString());
  query.append('take', take ? take.toString() : DEFAULT_TAKE.toString());

  order && query.append('order', `${order.field}:${order.direction}`);
  filter && query.append('filter', JSON.stringify(filter));

  return `?${query.toString()}`;
};
