import { ButtonFinder } from '@/components';
import React from 'react';
import styles from './LoadMoreButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const LoadMoreBtn = (props: Props) => {
  return (
    <div {...props} className='d-flex flex-row justify-content-center w-100'>
      <ButtonFinder className={cx('load-more-btn')}>Load more</ButtonFinder>
    </div>
  );
};
