import { AsyncImage, ButtonFinder } from '@/components';
import { Tag } from 'antd';
import classNames from 'classnames/bind';
import capitalize from 'lodash/capitalize';
import React, { memo } from 'react';
import { PostDetail } from '../PostDetail';
import styles from './Post.module.scss';
import { FcOvertime } from 'react-icons/fc';
import { Post as PostInterface } from '@/hooks/post/interface';

const cx = classNames.bind(styles);
const random = Math.floor(Math.random() * 10) % 2 === 0;

type Props = {
  postItem: PostInterface;
};

export const Post = memo((props: Props) => {
  const { postItem } = props;

  const ownerName =
    postItem.owner.firstName ||
    '' + ' ' + postItem.owner.middleName ||
    '' + ' ' + postItem.owner.latsName ||
    '';
  const state = random ? 'finding' : 'found';
  const [isHover, setIsHover] = React.useState(false);
  const [detailVisible, setDetailVisible] = React.useState(false);

  const onClosePostDetail = () => {
    setDetailVisible(false);
  };

  const showPostDetail = () => {
    setDetailVisible(true);
  };

  const renderSuggestViewDetail = () => {
    return (
      <div className={cx('detail')}>
        <div className={cx('detail-text')}>{postItem.title}</div>

        <ButtonFinder
          className={cx('detail__detail-btn', 'w-100 mt-4')}
          onClick={showPostDetail}
        >
          Detail
        </ButtonFinder>
        <ButtonFinder className={cx('detail__contact-btn', 'w-100 mt-4')}>
          Contact
        </ButtonFinder>
      </div>
    );
  };

  const renderMissingUserInfo = () => {
    return (
      <>
        <div className={cx('card__image', 'col-5 h-100 p-0')}>
          <AsyncImage src={postItem.photos[0]} />
        </div>
        <div className={cx('card__info', 'col-7 h-100')}>
          <Tag
            className={cx('card__info-status', `card__info-status--${state}`)}
          >
            {capitalize(state)}
          </Tag>
          <div className={cx('card__info-content')}>
            <div className={cx('content-item')}>
              <span>FullName: </span>
              {postItem.fullName}
            </div>
            <div className={cx('content-item')}>
              <span>Nick name: </span>
              {postItem.nickname}
            </div>
            <div className={cx('content-item')}>
              <span>Date Of Birth: </span>
              {postItem.dateOfBirth}
            </div>
            <div className={cx('content-item')}>
              <span>Gender: </span>
              {postItem.gender ? 'Female' : 'Male'}
            </div>
            <div className={cx('content-item')}>
              <span>Hometown: </span>
              {postItem.hometown.region}
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
            src={postItem.owner.avatar}
            className={cx('user__avatar')}
            avatar
          />
          {ownerName}
        </div>
        <div className={cx('created-at', 'd-flex align-items-center')}>
          <FcOvertime />
          <span>{new Date(postItem.updatedAt).toLocaleDateString()}</span>
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
        <PostDetail isVisible={detailVisible} onClose={onClosePostDetail} />
      )}
    </div>
  );
});
