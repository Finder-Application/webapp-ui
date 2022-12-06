import { IParamsDefault, TResponseList } from '@/hooks/interfaces';
import { Button, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import { Socket } from 'socket.io-client';

interface Props<T> {
  uesGetInfi: <T>(
    params: IParamsDefault<any>
  ) => UseInfiniteQueryResult<TResponseList<T>, unknown>;
  itemRender: (item: T) => JSX.Element;
  onSeen: (item: T) => void;
  isNewNoti: (item: T) => boolean;
  socket?: Socket;
  type: 'comment' | 'post';
}
export const BoxNotifications = <T,>({
  uesGetInfi,
  itemRender,
  onSeen,
  isNewNoti,
  socket,
  type,
}: Props<T>) => {
  const [listNoti, setListNoti] = useState<T[]>([]);
  const { data, fetchNextPage, hasNextPage, isLoading, refetch } = uesGetInfi({
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

  useEffect(() => {
    socket?.on('new-notification', (data) => {
      const notiParse = JSON.parse(data) as {
        type: 'comment' | 'post';
        data: any;
      };

      if (notiParse.type === type) {
        refetch({ refetchPage: () => true, fetching: true });
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      const list = data.pages.map((page) => page.data).flat() as T[];

      setListNoti([...list]);
    }
  }, [data]);

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
        dataSource={listNoti}
        renderItem={(item: T) => (
          <NotiItem
            onSeen={onSeen}
            itemRender={itemRender}
            item={item}
            isNewNoti={isNewNoti}
            key={(item as any).id}
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
  const [isNew, setIsNew] = useState(!isNewNoti(item));

  return (
    <List.Item
      onClick={() => {
        onSeen(item);
        setIsNew(false);
      }}
      className='cursor-pointer'
    >
      {itemRender(item)}

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
