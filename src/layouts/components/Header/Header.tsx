import { ButtonFinder } from '@/components/ButtonFinder';
import { FinderLogo } from '@/components/FinderLogo';
import {
  EditProfileIcon,
  SearchIcon,
  SettingIcon,
  SignOutIcon,
  UserProfileIcon,
  YourPostsIcon,
} from '@/components/Icons';
import { useOnClickOutside } from '@/hooks';
import { Dropdown, MenuProps } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Notification } from './Notification';

import { UserAvatar } from '@/components/UserAvatar';
import { SEARCH_QUERY } from '@/configs';
import { SettingScreens } from '@/pages/SettingsPage/SettingsPage';
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import { RouteUtils } from '@/utils/Route.utils';
import StorageUtils from '@/utils/Storage.utils';
import styles from './Header.module.scss';
export const cx = classNames.bind(styles);

const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [onFocusSearch, setOnFocusSearch] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_QUERY);

  const [searchValue, setSearchValue] = useState(searchQuery);

  const [user, resetUser, isLoggedIn] = useUserStore((state) => [
    state.user,
    state.resetUser,
    state.isLoggedIn,
  ]);

  const navigate = useNavigate();

  const [setSelectedPost] = usePostStore((state) => [state.setSelectedPost]);
  // init Refs
  const refSearch = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position >= moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  useOnClickOutside(refSearch, () => {
    setOnFocusSearch(false);
    setSearchValue('');
  });
  const headerClassName = cx('header', {
    ['header-hidden']: !visible,
  });
  // classnames
  const searchWrapperClassName = cx('search-wrapper', {
    'search-wrapper--active': onFocusSearch,
  });
  const getNavbarClassName = ({ isActive }: { isActive: boolean }): string => {
    return cx('header__nav__item', {
      ['header__nav__item__active']: isActive,
    });
  };
  const renderNavbar = () => {
    return (
      <div className={cx('header__nav')}>
        <NavLink className={getNavbarClassName} to={RouteUtils.getPath('home')}>
          Home
        </NavLink>
        <span className={cx('header__nav__dot')}></span>
        <NavLink
          className={getNavbarClassName}
          to={RouteUtils.getPath('about')}
        >
          About us
        </NavLink>
        <span className={cx('header__nav__dot')}></span>
        <NavLink className={getNavbarClassName} to='/guide'>
          Guidelines
        </NavLink>
      </div>
    );
  };

  const userDropdowns = [
    {
      title: 'Your Posts',
      icon: YourPostsIcon,
      onClick: () => navigate(RouteUtils.getPath('yourPosts')),
    },
    {
      title: 'Account Settings',
      icon: SettingIcon,
      onClick: () => {
        navigate(`${RouteUtils.getPath('settings')}/${SettingScreens.GENERAL}`);
      },
    },

    {
      title: 'Sign out',
      icon: SignOutIcon,
      onClick: () => {
        StorageUtils.clear();
        resetUser();
        navigate(RouteUtils.getPath('login'));
      },
    },
  ];

  const userDropdownItems: MenuProps['items'] = userDropdowns.map(
    (item, index) => {
      const Icon = item.icon;
      return {
        key: index,
        label: (
          <div
            className={cx(
              'header__user-dropdown__item',
              index !== userDropdowns.length - 1 &&
                'header__user-dropdown__item__last-item'
            )}
            onClick={item.onClick}
          >
            <Icon className={cx('header__user-dropdown__item__icon', 'mr-3')} />
            <span>{item.title}</span>
          </div>
        ),
      };
    }
  );

  const handleCreatePost = () => {
    navigate(RouteUtils.getPath('createPost'));
    setSelectedPost(undefined);
  };
  return (
    <div className={headerClassName}>
      <NavLink to={RouteUtils.getPath('home')}>
        <FinderLogo isLight={false} />
      </NavLink>
      {renderNavbar()}
      <div className={cx('header__right')}>
        <div
          className={searchWrapperClassName}
          ref={refSearch}
          onClick={() => setOnFocusSearch(true)}
        >
          <SearchIcon className={cx('search-icon')} />
          <input
            value={searchValue || ''}
            className={cx('search-input')}
            type='text'
            placeholder='Search in here ..'
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchValue) {
                  setSearchParams(
                    createSearchParams({
                      [`${SEARCH_QUERY}`]: searchValue,
                    })
                  );
                }
              }
            }}
          />
          {/* {onFocusSearch && searchValue && (
            <div className={cx('search-result')}></div>
          )} */}
        </div>

        {isLoggedIn && (
          <>
            <Notification />
            <Dropdown
              menu={{ items: userDropdownItems }}
              placement='bottomLeft'
              arrow
              overlayClassName={cx('header__user-dropdown')}
            >
              <UserAvatar
                user={user}
                popup={false}
                onClick={() => navigate(RouteUtils.getPath('yourPosts'))}
              />
            </Dropdown>
          </>
        )}

        <ButtonFinder
          className={cx('header__right__upload-btn')}
          onClick={handleCreatePost}
        >
          Upload
        </ButtonFinder>
      </div>
    </div>
  );
};

export default Header;
