import { IParamsDefault, TResponseList } from '@/hooks/interfaces';
import { Button, List, Skeleton } from 'antd';
import { useState } from 'react';
import { UseInfiniteQueryResult } from 'react-query';

interface Props<T> {
  uesGetInfi: <T>(
    params: IParamsDefault<any>
  ) => UseInfiniteQueryResult<TResponseList<T>, unknown>;
  itemRender: (item: T) => JSX.Element;
  onSeen: (item: T) => void;
  isNewNoti: (item: T) => boolean;
}
export const BoxNotifications = <T,>({
  uesGetInfi,
  itemRender,
  onSeen,
  isNewNoti,
}: Props<T>) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = uesGetInfi({
    take: 20,
    order: {
      field: 'createdAt',
      direction: 'DESC',
    },
    // filter: [
    //   {
    //     field: 'seen',
    //     operator: Operator.Equal,
    //     value: 'false',
    //   },
    // ],
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
          <NotiItem
            onSeen={onSeen}
            itemRender={itemRender}
            item={item}
            isNewNoti={isNewNoti}
          />
        )}
      />
    </div>
  );
};

interface NotiNewProps<T> {
  item: T;
  itemRender: (item: T) => JSX.Element;
  isNewNoti: (item: T) => boolean;
  onSeen: (item: T) => void;
}
export const NotiItem = <T,>({
  item,
  itemRender,
  isNewNoti,
  onSeen,
}: NotiNewProps<T>) => {
  const [isNew, setIsNew] = useState(isNewNoti(item));

  return (
    <List.Item
      onClick={() => {
        onSeen(item);
        setIsNew(false);
      }}
      className='cursor-pointer'
    >
      <Skeleton avatar title={false} loading={false} active={false}>
        {itemRender(item)}
      </Skeleton>

      {isNew && (
        <div className='dot-active'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/891/891449.png'
            alt=''
            width={22}
          />
        </div>
      )}
    </List.Item>
  );
};
