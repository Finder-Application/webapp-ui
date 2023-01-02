import React from 'react';
import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';
import { AsyncImage } from '@/components';
import authImages from '@/assets/images/auth';
import { FinderLogo } from '@/components/FinderLogo';
import { useNavigate } from 'react-router-dom';
import { RouteUtils } from '@/utils/Route.utils';

const cx = classNames.bind(styles);
const AuthLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={cx('auth-layout', 'd-flex justify-content-between')}>
      <div
        className={cx('auth-layout__logo')}
        onClick={() => navigate(RouteUtils.getPath('home'))}
      >
        <FinderLogo isLight={true} />
      </div>
      <div className={cx('auth-layout__left', 'w-50')}>
        <AsyncImage
          src={authImages.salyLeft}
          imageLoading={false}
          wrapperClassName={cx('image', 'image--left')}
        />
      </div>
      <div className={cx('auth-layout__right', 'w-50')}>
        <AsyncImage
          src={authImages.salyRight}
          imageLoading={false}
          wrapperClassName={cx('image')}
        />
      </div>
      <div className={cx('content')}>{children}</div>
    </div>
  );
};

export default AuthLayout;
