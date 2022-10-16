import React from 'react';
import { LogoIcon } from '../Icons';
import styles from './FinderLogo.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface FinderLogoProps {
  isLight?: boolean;
}
type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FinderLogoProps;
export const FinderLogo = (props: Props) => {
  const { isLight, ...defaultProps } = props;
  const buttonFinderClassName = cx('finder-logo', props.className);
  return (
    <div {...defaultProps} className={buttonFinderClassName}>
      <LogoIcon className={cx(`finder-logo__icon`)} isLight />
      <div className={cx(`finder-logo__name`)}>Finder</div>
    </div>
  );
};
