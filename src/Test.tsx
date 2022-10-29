import { uesGetInfiComments } from './hooks/comments/query';
import { uesGetInfinities } from './hooks/common/uesGetInfinities';
import { QUERY_KEY, RESOURCE } from './hooks/constants';

export const Test = () => {
  const { data, fetchNextPage, hasNextPage } = uesGetInfinities({
    defineQUERY_KEY: QUERY_KEY.PAGINATION_POSTS,
    query: {
      page: 1,
      take: 5,
    },
    configApi: {
      resource: RESOURCE.POST,
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
