import React from 'react';
import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';

const cx = classNames.bind(styles);
const AuthLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('auth-layout', 'd-flex justify-content-between')}>
      <div className={cx('auth-layout')}></div>
      <div className={cx('auth-layout__left')}></div>
      <div className={cx('content')}>{children}</div>
      <div></div>
    </div>
  );
};

export default AuthLayout;
