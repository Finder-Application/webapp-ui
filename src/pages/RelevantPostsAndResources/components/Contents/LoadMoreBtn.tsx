import { ButtonFinder } from '@/components';
import React from 'react';
import { cx } from './Contents';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const LoadMoreBtn = (props: Props) => {
  return (
    <div className='d-flex flex-row justify-content-center' {...props}>
      <ButtonFinder className={cx('content__load-more-btn')}>
        Load more
      </ButtonFinder>
    </div>
  );
};
