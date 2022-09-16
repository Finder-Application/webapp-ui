import { AsyncImage, ButtonFinder } from '@/components';
import { constants } from '@/configs';
import { Button, Skeleton, Tag } from 'antd';
import classNames from 'classnames/bind';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { PostDetail } from '../PostDetail';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);
const random = Math.floor(Math.random() * 10) % 2 === 0;
export const Post = () => {
  const state = random ? 'finding' : 'found';
  const [isHover, setIsHover] = React.useState(false);
  const [visibleDetail, setVisibleDetail] = React.useState(false);
  return (
    <div className={cx('post')}>
      <div
        className={cx('card', 'd-flex  justify-content-center')}
        onMouseMove={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
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
        {isHover && (
          <div className={cx('detail', 'd-flex justify-content-between')}>
            <div className={cx('detail-text')}>
              Lorem Ipsum is simply dummy text of the printing
            </div>

            <div
              className={cx(
                'col-6 d-flex align-items-center justify-content-end'
              )}
            >
              <ButtonFinder size='small' onClick={() => setVisibleDetail(true)}>
                Detail{' '}
              </ButtonFinder>
              <ButtonFinder size='small'>Contact </ButtonFinder>
            </div>
          </div>
        )}
      </div>

      <div
        className={cx(
          'user',
          'd-flex justify-content-between align-items-center'
        )}
      >
        <div
          className={cx(
            'user__info',
            'd-flex align-items-center font-weight-bold'
          )}
        >
          <AsyncImage
            src='https://picsum.photos/200/300'
            className={cx('user__avatar')}
            avatar
          />
          Nguyen Van Nam
        </div>
        <div className={cx('created-at')}>{new Date().toDateString()}</div>
      </div>
      {visibleDetail && (
        <PostDetail
          isVisible={visibleDetail}
          onClose={() => setVisibleDetail(false)}
        />
      )}
    </div>
  );
};
