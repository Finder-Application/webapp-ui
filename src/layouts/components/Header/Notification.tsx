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
import { useNavigate } from 'react-router-dom';
import { RouteUtils } from '@/utils/Route.utils';

enum NotificationTab {
  POSTS = 'Posts',
  COMMENTS = 'Comments',
}

export const Notification = () => {
  const [currentTab, setCurrentTab] = useState<NotificationTab>(
    NotificationTab.POSTS
  );

  const { totalNoti, socket } = useNoti();

  console.log('totalNoti', totalNoti);

  const navigate = useNavigate();

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

                navigate(`${RouteUtils.getPath('postDetail')}/${item.postId}`);
              }}
              itemRender={(item: PostNotis) => (
                <List.Item.Meta
                  avatar={<Avatar src={item.user.avatar} />}
                  title={item.title}
                  // check title if > 50 char then cut it and add ...
                  description={
                    item.content.length > 50
                      ? item.content.slice(0, 50) + '...'
                      : item.content
                  }
                />
              )}
              isNewNoti={(item: PostNotis) => item.seen}
              type='post'
              socket={socket}
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
                navigate(`${RouteUtils.getPath('postDetail')}/${item.postId}`);
              }}
              itemRender={(item: CmtNotis) => (
                <List.Item.Meta
                  avatar={<Avatar src={item.user.avatar} />}
                  description={item.content}
                />
              )}
              isNewNoti={(item: PostNotis) => item.seen}
              type='comment'
              socket={socket}
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
