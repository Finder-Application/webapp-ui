import { AsyncImage, ButtonFinder } from '@/components';
import { Tag } from 'antd';
import classNames from 'classnames/bind';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { PostDetail } from '../PostDetail';
import styles from './Post.module.scss';
import { FcOvertime } from 'react-icons/fc';

const cx = classNames.bind(styles);
const random = Math.floor(Math.random() * 10) % 2 === 0;
export const Post = () => {
  const state = random ? 'finding' : 'found';
  const [isHover, setIsHover] = React.useState(false);
  const [detailVisible, setDetailVisible] = React.useState(false);

  const renderSuggestViewDetail = () => {
    return (
      <div className={cx('detail')}>
        <div className={cx('detail-text')}>
          Lorem Ipsum is simply dummy text of the printing
        </div>

        <ButtonFinder
          className={cx('w-100 mt-4')}
          type='primary'
          onClick={() => setDetailVisible(true)}
        >
          Detail{' '}
        </ButtonFinder>
        <ButtonFinder className={cx('w-100 mt-4')} type='default'>
          Contact{' '}
        </ButtonFinder>
      </div>
    );
  };

  const renderMissingUserInfo = () => {
    return (
      <>
        <div className={cx('card__image', 'col-5 h-100')}>
          <AsyncImage src='https://picsum.photos/200' />
        </div>
        <div className={cx('card__info', 'col-7 h-100')}>
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
      </>
    );
  };

  const renderBottom = () => {
    return (
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
        <div className={cx('created-at', 'd-flex align-items-center')}>
          <FcOvertime />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    );
  };
  return (
    <div className={cx('post')}>
      <div
        className={cx('card', 'd-flex  justify-content-center')}
        onMouseMove={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {renderMissingUserInfo()}
        {isHover && renderSuggestViewDetail()}
      </div>
      {renderBottom()}
      {detailVisible && (
        <PostDetail
          isVisible={detailVisible}
          onClose={() => setDetailVisible(false)}
        />
      )}
    </div>
  );
};
