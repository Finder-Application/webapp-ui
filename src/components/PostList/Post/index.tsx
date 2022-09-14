import React from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { AsyncImage } from '@/components';
import { Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const cx = classNames.bind(styles);

interface PostProps {
  index: number;
}
export const Post = (props: PostProps) => {
  const { index } = props;
  return (
    <div
      className={cx('post', 'mb-4')}
      style={{
        animationDelay: `${index * 0.25}s`,
      }}
    >
      <div className={cx('card', 'd-flex')}>
        <div className={cx('card__image', 'col-6 h-100')}>
          <AsyncImage src='https://picsum.photos/200' />
        </div>
        <div className={cx('card__info', 'col-6 h-100')}>
          <div className={cx('card__info__status')}>
            <Tag color='green'>Finding</Tag>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};
