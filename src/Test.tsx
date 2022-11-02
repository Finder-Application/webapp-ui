import { PostEntity } from './entites/Post';
import { uesGetInfinities } from './hooks/common/useGetInfinities';
import { FEATURE, QUERY_KEY } from './hooks/constants';
import { Operator } from './services/common/types';
interface TestParams {
  name: string;
}
export const Test = () => {
  const { data, fetchNextPage, hasNextPage } = uesGetInfinities<
    any,
    PostEntity
  >({
    query_key: QUERY_KEY.PAGINATION_POSTS,
    params: {
      page: 1,
      take: 5,
      filter: [
        {
          field: 'fullName',
          operator: Operator.Equal,
          value: '',
        },
      ],
    },
    configApi: {
      feature: FEATURE.POST,
      isPublic: false,
    },
  });

  // uesGetInfiComments({
  //   take: 5,
  //   optionKey: { key: 'id', value: '21' },
  // });

  console.log(data?.pages);

  return (
    <div>
      Test
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>load More</button>
      )}
      {data?.pages?.map((page) =>
        page.data.map((item) => <div>{item.id}</div>)
      )}
    </div>
  );
};
