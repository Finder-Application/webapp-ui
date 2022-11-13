import { NotificationIcon } from '@/components/Icons';
import { TOOL_TIP_zINDEX } from '@/configs';
import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { cx } from './Header';

enum NotificationTab {
  ALL = 'All',
  UNREAD = 'Unread',
}

export const Notification = () => {
  const [currentTab, setCurrentTab] = useState<NotificationTab>(
    NotificationTab.ALL
  );

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
            {TabItem(NotificationTab.ALL)}
            {TabItem(NotificationTab.UNREAD)}
          </div>

          <div className='d-flex flex-column align-items-center justify-content-center'>
            {currentTab === NotificationTab.ALL
              ? 'All Content'
              : 'Unread Content'}
          </div>
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
      <NotificationIcon style={{ cursor: 'pointer' }} className='m-4' />
    </Tooltip>
  );
};
