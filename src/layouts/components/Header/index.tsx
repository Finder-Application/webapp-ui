import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

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
  return (
    <div className={headerClassName}>
      <div className={cx('header__logo')}>Finder</div>
    </div>
  );
};

export default Header;
