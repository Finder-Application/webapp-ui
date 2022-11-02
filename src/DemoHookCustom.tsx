import { uesGetInfiComments } from './hooks/comments/query';
import { uesGetInfinities } from './hooks/common/uesGetInfinities';
import { useMutationDelete } from './hooks/common/useDelete';
import { QUERY_KEY, RESOURCE } from './hooks/constants';
import { queryClient } from './main';

export const Test = () => {
  // const { data, fetchNextPage, hasNextPage } = uesGetInfinities({
  //   defineQueryKey: QUERY_KEY.PAGINATION_POSTS,
  //   query: {
  //     page: 1,
  //     take: 5,
  //   },
  //   configApi: {
  //     resource: RESOURCE.POST,
  //     isPublic: false,
  //   },
  // });

  const { data, fetchNextPage, hasNextPage } = uesGetInfiComments({
    take: 5,
    optionKey: { key: 'id', value: '21' },
  });

  const { mutate } = useMutationDelete({
    resource: RESOURCE.COMMENT,
    query_key: QUERY_KEY.PAGINATION_COMMENTS,
  });

  const test = () => {
    const previousValueDelete = queryClient.getQueriesData(
      QUERY_KEY.PAGINATION_POSTS
    );

    console.log('previousValueDelete:', previousValueDelete);
  };

  return (
    <div>
      Test
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>load More</button>
      )}
      <button onClick={test}>click get old data</button>
      {data?.pages?.map((page) =>
        page.data.map((item) => (
          <div
            onClick={() =>
              mutate({
                id: item.id.toString(),
              })
            }
          >
            {item.id}
          </div>
        ))
      )}
    </div>
  );
};
