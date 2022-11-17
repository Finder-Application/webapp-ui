import { IParamsDefault, TResponseList } from '@/hooks/interfaces';
import { Avatar, Button, List, ListProps, Skeleton } from 'antd';
import { UseInfiniteQueryResult } from 'react-query';

interface Props<T> {
  uesGetInfi: <T>(
    params: IParamsDefault
  ) => UseInfiniteQueryResult<TResponseList<T>, unknown>;
  itemRender: (item: T) => JSX.Element;
}
export const ContentNotifications = <T,>({
  uesGetInfi,
  itemRender,
}: Props<T>) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = uesGetInfi({
    take: 20,
    order: {
      field: 'createdAt',
      direction: 'DESC',
    },
  });

  const onLoadMore = () => {
    fetchNextPage();
  };

  const loadMore = hasNextPage ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null;
  return (
    <div className='d-flex flex-column   pt-3 justify-content-center'>
      <List
        size='small'
        loading={isLoading}
        itemLayout='horizontal'
        loadMore={loadMore}
        dataSource={
          (data ? data.pages.map((page) => page.data).flat() : []) as T[]
        }
        renderItem={(item: T) => (
          <List.Item>
            <Skeleton avatar title={false} loading={isLoading} active={false}>
              {itemRender(item)}
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
