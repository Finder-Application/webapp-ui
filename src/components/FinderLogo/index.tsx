import React from 'react';
import { LogoIcon } from '../Icons';
import styles from './FinderLogo.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const FinderLogo = () => {
  const buttonFinderClassName = cx('finder-logo');
  return (
    <div className={buttonFinderClassName}>
      <LogoIcon className={cx(`finder-logo__icon`)} />
      <div className={cx(`finder-logo__name`)}>Finder</div>
    </div>
  );
};
