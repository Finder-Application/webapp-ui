import {
  InformationIcon,
  LockIcon,
  TingingBellIcon,
  UserContactIcon,
} from '@/components/Icons';
import { LoadingModal } from '@/components/LoadingModal';
import { useGetMe } from '@/hooks/auth/query';
import { formatUserName } from '@/utils/format.util';
import { RouteUtils } from '@/utils/Route.utils';
import { Avatar } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePasswordForm from './components/ChangePasswordForm';
import EditContactForm from './components/EditContactForm';
import NotificationForm from './components/NotificationForm';
import ProfileForm from './components/ProfileForm';
import styles from './SettingsPage.module.scss';

export enum SettingScreens {
  GENERAL = 'general',
  EDIT_CONTACT = 'edit_contact',
  PASSWORD = 'password',
  NOTIFICATIONS = 'notifications',
}

export const AVATAR_PLACEHOLDER =
  'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png';

export const cn = classNames.bind(styles);
const SettingsPage = () => {
  const { screen } = useParams<{ screen: string }>();
  const { data: me } = useGetMe();

  const [currentScreen, setCurrentScreen] = useState(screen as SettingScreens);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentScreen(screen as SettingScreens);
  }, [screen]);

  const getTitle = (screen: SettingScreens) => {
    let title;
    switch (screen) {
      case SettingScreens.GENERAL:
        title = 'General';
        break;
      case SettingScreens.EDIT_CONTACT:
        title = 'Edit contact';
        break;
      case SettingScreens.PASSWORD:
        title = 'Password';
        break;
      case SettingScreens.NOTIFICATIONS:
        title = 'Notifications';
        break;
      default:
        return null;
    }
    return title;
  };

  const getSubTitle = (screen: SettingScreens) => {
    let subtitle;
    switch (screen) {
      case SettingScreens.GENERAL:
        subtitle = 'Update your username and manage your account';
        break;
      case SettingScreens.EDIT_CONTACT:
        subtitle = 'Update your contact information';
        break;
      case SettingScreens.PASSWORD:
        subtitle = 'Manage your password';
        break;
      case SettingScreens.NOTIFICATIONS:
        subtitle = 'Get notified of activity at Finder';
        break;
      default:
        return null;
    }
    return subtitle;
  };
  const renderDashboard = () => {
    const TabItem = ({
      screen,
      icon: Icon,
    }: {
      screen: SettingScreens;
      icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    }) => {
      let title = getTitle(screen);

      const isActive = currentScreen === screen;
      return (
        <div
          className={cn('item', isActive && 'item--active')}
          onClick={() =>
            navigate(`${RouteUtils.getPath('settings')}/${screen}`)
          }
        >
          <Icon width={18} height={18} className='mr-3' />
          {title}
        </div>
      );
    };
    return (
      <div className={cn('sidebar')}>
        <TabItem screen={SettingScreens.GENERAL} icon={InformationIcon} />
        <TabItem screen={SettingScreens.EDIT_CONTACT} icon={UserContactIcon} />
        <TabItem screen={SettingScreens.PASSWORD} icon={LockIcon} />
        <TabItem screen={SettingScreens.NOTIFICATIONS} icon={TingingBellIcon} />
      </div>
    );
  };

  const renderHeader = () => {
    const title = getTitle(currentScreen);
    const subtitle = getSubTitle(currentScreen);

    const userName = formatUserName({
      user: {
        ...me,
      },
    });

    return (
      <>
        <Avatar src={me?.avatar ? me?.avatar : AVATAR_PLACEHOLDER} />
        <div className='ml-3'>
          <div className='d-flex flex-row align-items-center'>
            <div className={cn('title')}>{userName}</div>
            <div className='mx-1'>/</div>
            <div className={cn('title')}>{title}</div>
          </div>
          <div className={cn('subtitle')}>{subtitle}</div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    switch (currentScreen) {
      case SettingScreens.GENERAL:
        return <ProfileForm />;
      case SettingScreens.EDIT_CONTACT:
        return <EditContactForm />;
      case SettingScreens.PASSWORD:
        return <ChangePasswordForm />;
      case SettingScreens.NOTIFICATIONS:
        return <NotificationForm />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('settings-page')}>
      <LoadingModal />
      {renderDashboard()}
      <div className='w-100'>
        <div className={cn('header', 'd-flex flex-row')}>{renderHeader()}</div>
        <div className={cn('content')}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
