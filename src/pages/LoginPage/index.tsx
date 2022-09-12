import { AsyncImage } from '@/components';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classNames.bind(styles);
const LoginPage = () => {
  return (
    <div className={cx('login-page')}>
      LoginPage
      <AsyncImage
        className='hello'
        src='https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      />
    </div>
  );
};

export default LoginPage;
