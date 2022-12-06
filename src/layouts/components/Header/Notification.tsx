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
import { UserAvatar } from '@/components/UserAvatar';

enum NotificationTab {
  POSTS = 'Posts',
  COMMENTS = 'Comments',
}

export const Notification = () => {
  const [currentTab, setCurrentTab] = useState<NotificationTab>(
    NotificationTab.POSTS
  );

  const { totalNoti, socket } = useNoti();

  const MAX_DESCRIPTION = 50;
  const MAX_LENGTH_TITLE = 1000;
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

  const getContentDisplay = (
    content: string,
    Maxlength: number,
    isTitle?: boolean
  ) => {
    let temp = '';
    if (isTitle) {
      temp = 'have a relevant post';
    }
    const contentDisplay =
      content.length > Maxlength
        ? content.slice(0, Maxlength) + '...'
        : content;
    return `${contentDisplay} ${temp}`;
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
                  avatar={
                    <UserAvatar
                      user={{
                        ...item.user,
                        avatar: item.photo,
                      }}
                    />
                  }
                  title={getContentDisplay(item.title, MAX_LENGTH_TITLE, true)}
                  // check title if > 50 char then cut it and add ...
                  description={getContentDisplay(item.content, MAX_DESCRIPTION)}
                />
              )}
              isNewNoti={(item: PostNotis) => !!!item.seen}
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
                  avatar={<UserAvatar user={item.user} />}
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
