import { ButtonFinder } from '@/components/ButtonFinder';
import { FinderLogo } from '@/components/FinderLogo';
import { NotificationIcon, UserIcon } from '@/components/Icons';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import styles from './Header.module.scss';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const cx = classNames.bind(styles);
const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

  return (
    <div className={headerClassName}>
      <FinderLogo />
      <NavBar />
      <div className={cx('header__right')}>
        <div
          className={searchWrapperClassName}
          ref={refSearch}
          onClick={() => setOnFocusSearch(true)}
        >
          <BsSearch className={cx('search-icon')}/>
          <input
            defaultValue={searchValue}
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
