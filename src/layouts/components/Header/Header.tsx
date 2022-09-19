import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Input } from 'antd';
import {
  LogoIcon,
  NotificationIcon,
  SearchIcon,
  UserIcon,
} from '@/components/Icons';
import { Link, matchPath } from 'react-router-dom';
import { ButtonFinder } from '@/components/ButtonFinder';
import { FinderLogo } from '@/components/FinderLogo';

const cx = classNames.bind(styles);
const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
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

  const headerClassName = cx('header', {
    ['header-hidden']: !visible,
  });

  const NavBar = () => {
    return (
      <div className={cx('header__nav')}>
        <Link
          className={cx('header__nav__item', 'header__nav__item__active')}
          to='/'
        >
          Home
        </Link>
        <span className={cx('header__nav__dot')}></span>
        <Link className={cx('header__nav__item')} to='about'>
          About us
        </Link>
        <span className={cx('header__nav__dot')}></span>
        <Link className={cx('header__nav__item')} to='about'>
          Guidlines
        </Link>
      </div>
    );
  };

  return (
    <div className={headerClassName}>
      <FinderLogo />
      <NavBar />

      <div className={cx('header__right')}>
        <Input
          prefix={<SearchIcon />}
          className={cx('header__right__input')}
          placeholder='Search post in here ...'
        />
        <NotificationIcon className='m-4' />
        <UserIcon />
        <ButtonFinder className={cx('header__right__upload-btn')}>
          Upload
        </ButtonFinder>
      </div>
    </div>
  );
};

export default Header;
