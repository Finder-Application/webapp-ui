import React from 'react';
import { LogoIcon } from '../Icons';
import styles from './FinderLogo.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export const FinderLogo = (props: Props) => {
  const buttonFinderClassName = cx('finder-logo', props.className);
  return (
    <div {...props} className={buttonFinderClassName}>
      <LogoIcon className={cx(`finder-logo__icon`)} />
      <div className={cx(`finder-logo__name`)}>Finder</div>
    </div>
  );
};
