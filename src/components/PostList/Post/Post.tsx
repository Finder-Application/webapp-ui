import { AsyncImage } from '@/components';
import { constants } from '@/configs';
import { Skeleton, Tag } from 'antd';
import classNames from 'classnames/bind';
import capitalize from 'lodash/capitalize';
import React from 'react';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);

interface PostProps {
  index: number;
}

export const Post = (props: PostProps) => {
  const { index } = props;
  const state = Math.floor(Math.random() * 10) % 2 === 0 ? 'finding' : 'found';
  // const timeDelay =
  //   (index === constants.POST_RENDER - 1 ? 0 : index + 0.1) * 0.25;

  return (
    <div
      className={cx('post')}
      style={
        {
          // animationDelay: `${timeDelay}s`,
        }
      }
    >
      <div className={cx('card', 'd-flex  justify-content-center')}>
        <div className={cx('card__image', 'col-6 h-100')}>
          <AsyncImage src='https://picsum.photos/200' />
        </div>
        <div className={cx('card__info', 'col-6 h-100')}>
          <Tag
            className={cx('card__info-status', `card__info-status--${state}`)}
          >
            {capitalize(state)}
          </Tag>
          <div className={cx('card__info-content')}>
            <div className={cx('content-item')}>
              <span>First name: </span>
              Nguyen Tat Van
            </div>
            <div className={cx('content-item')}>
              <span>Nick name: </span>
              Cu Teo
            </div>
            <div className={cx('content-item')}>
              <span>Date Of Birth: </span>
              Nguyen Tat Van
            </div>
            <div className={cx('content-item')}>
              <span>Gender: </span>
              Male
            </div>
            <div className={cx('content-item')}>
              <span>Hometown: </span>
              Quang Tri
            </div>
          </div>
        </div>
      </div>

      <div
        className={cx(
          'user',
          'd-flex justify-content-between align-items-center'
        )}
      >
        <div className={cx('user__info', 'd-flex align-items-center')}>
          <AsyncImage
            src='https://picsum.photos/200/300'
            className={cx('user__avatar')}
            avatar
          />
          Nguyen Van Nam
        </div>
        <div className={cx('created-at')}>{new Date().toDateString()}</div>
      </div>
    </div>
  );
};
