import React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Footer, Header } from '../components';

const cx = classNames.bind(styles);
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('default-layout')}>
      <Header />
      <div className='main'>{children}</div>
      <Footer />
    </div>
  );
};
