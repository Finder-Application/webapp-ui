import { NotificationIcon } from '@/components/Icons';
import { TOOL_TIP_zINDEX } from '@/configs';
import { IParamsDefault, TResponseList } from '@/hooks/interfaces';
import { PostNotis, CmtNotis } from '@/hooks/notifications/interface';
import {
  uesGetInfiCmtNotis,
  uesGetInfiPostNotis,
} from '@/hooks/notifications/query';
import { useNoti } from '@/hooks/notifications/useNoti';
import { Avatar, Badge, List, Tooltip } from 'antd';
import { useState } from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import { cx } from './Header';
import { BoxNotifications } from './BoxNotifications';

enum NotificationTab {
  POSTS = 'Posts',
  COMMENTS = 'Comments',
}

export const Notification = () => {
  const [currentTab, setCurrentTab] = useState<NotificationTab>(
    NotificationTab.POSTS
  );

  const { totalNoti, socket } = useNoti();

  const TabItem = (item: NotificationTab) => {
    return (
      <div
        className={cx(
          'header__notification-dropdown__content__tab',
          currentTab === item &&
            'header__notification-dropdown__content__tab--active'
        )}
        onClick={() => setCurrentTab(item)}
      >
        {item}
      </div>
    );
  };

  return (
    <Tooltip
      placement='bottomRight'
      title={
        <div className={cx('header__notification-dropdown__content')}>
          <h3>Notifications</h3>

          <div className='d-flex flex-row align-items-center'>
            {TabItem(NotificationTab.POSTS)}
            {TabItem(NotificationTab.COMMENTS)}
          </div>

          {currentTab === NotificationTab.POSTS ? (
            <BoxNotifications
              uesGetInfi={
                uesGetInfiPostNotis as <PostNotis>(
                  params: IParamsDefault<{}>
                ) => UseInfiniteQueryResult<TResponseList<PostNotis>, unknown>
              }
              onSeen={(item: PostNotis) => {
                socket?.emit('seen-notification', {
                  id: item.id,
                  type: 'post',
                });
              }}
              itemRender={(item: PostNotis) => (
                <List.Item.Meta
                  avatar={<Avatar src={item.user.avatar} />}
                  title={item.title}
                  description={item.content}
                />
              )}
              isNewNoti={(item: PostNotis) => !!!item.seen}
            />
          ) : (
            <BoxNotifications
              uesGetInfi={
                uesGetInfiCmtNotis as <CmtNotis>(
                  params: IParamsDefault<{}>
                ) => UseInfiniteQueryResult<TResponseList<CmtNotis>, unknown>
              }
              onSeen={(item: PostNotis) => {
                socket?.emit('seen-notification', {
                  id: item.id,
                  type: 'comment',
                });
              }}
              itemRender={(item: CmtNotis) => (
                <List.Item.Meta
                  avatar={<Avatar src={item.user.avatar} />}
                  // title={item.title}
                  description={item.content}
                />
              )}
              isNewNoti={(item: PostNotis) => !!item.seen}
            />
          )}
        </div>
      }
      trigger='click'
      zIndex={TOOL_TIP_zINDEX}
      overlayInnerStyle={{
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '1em 1em',
      }}
      overlayClassName={cx('header__notification-dropdown')}
    >
      <Badge count={totalNoti} overflowCount={999}>
        <NotificationIcon style={{ cursor: 'pointer' }} className='m-4' />
      </Badge>
    </Tooltip>
  );
};
