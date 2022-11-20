import { ButtonFinder } from '@/components/ButtonFinder';
import { FinderLogo } from '@/components/FinderLogo';
import {
  EditProfileIcon,
  SearchIcon,
  SettingIcon,
  SignOutIcon,
  UserIcon,
  UserProfileIcon,
  YourPostsIcon,
} from '@/components/Icons';
import { ROUTES } from '@/configs';
import { useOnClickOutside } from '@/hooks';
import { Dropdown, MenuProps } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Notification } from './Notification';

import styles from './Header.module.scss';
import { useUserStore } from '@/store/user';
import { useGetMe } from '@/hooks/auth/query';
export const cx = classNames.bind(styles);
const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const user = useUserStore((state) => state.user);

  const { data: me } = useGetMe();

  const navigate = useNavigate();

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
  const NavBar = () => {
    return (
      <div className={cx('header__nav')}>
        <NavLink className={getNavbarClassName} to='/'>
          Home
        </NavLink>
        <span className={cx('header__nav__dot')}></span>
        <NavLink className={getNavbarClassName} to='/about'>
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
      title: 'Profile',
      icon: UserProfileIcon,
    },
    {
      title: 'Edit Profile',
      icon: EditProfileIcon,
    },
    {
      title: 'Your Posts',
      icon: YourPostsIcon,
      onClick: () => navigate(ROUTES.yourPosts),
    },
    {
      title: 'Account Settings',
      icon: SettingIcon,
    },
    {
      title: 'Sign out',
      icon: SignOutIcon,
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

  return (
    <div className={headerClassName}>
      <NavLink to='/'>
        <FinderLogo isLight={false} />
      </NavLink>
      <NavBar />
      <div className={cx('header__right')}>
        <div
          className={searchWrapperClassName}
          ref={refSearch}
          onClick={() => setOnFocusSearch(true)}
        >
          <SearchIcon className={cx('search-icon')} />
          <input
            value={searchValue}
            className={cx('search-input')}
            type='text'
            placeholder='Search in here ..'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {onFocusSearch && searchValue && (
            <div className={cx('search-result')}></div>
          )}
        </div>

        {me && (
          <>
            <Notification />
            <Dropdown
              menu={{ items: userDropdownItems }}
              placement='bottomLeft'
              arrow
              overlayClassName={cx('header__user-dropdown')}
            >
              <UserIcon style={{ cursor: 'pointer' }} />
            </Dropdown>
          </>
        )}

        <ButtonFinder
          className={cx('header__right__upload-btn')}
          onClick={() => navigate(ROUTES.createPost)}
        >
          Upload
        </ButtonFinder>
      </div>
    </div>
  );
};

export default Header;
