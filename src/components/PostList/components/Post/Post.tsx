import { AsyncImage, ButtonFinder } from '@/components';
import { ROUTES } from '@/configs';
import { Post as PostInterface } from '@/hooks/post/interface';
import { usePostStore } from '@/store/post';
import { formatUserName } from '@/utils/format.util';
import { RouteUtils } from '@/utils/Route.utils';
import { Progress } from 'antd';
import classNames from 'classnames/bind';
import React, { memo } from 'react';
import { FcOvertime } from 'react-icons/fc';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);
type Props = {
  postItem: PostInterface;
  onHomepage?: boolean;
};

export const Post = memo((props: Props) => {
  const { postItem, onHomepage = true } = props;
  const navigate = useNavigate();
  const setSearchParams = useSearchParams()[1];

  const setSelectedPost = usePostStore((state) => state.setSelectedPost);

  const ownerName = formatUserName({
    user: {
      firstName: postItem.owner.firstName,
      middleName: postItem.owner.middleName,
      lastName: postItem.owner.lastName,
    },
  });

  const [isHover, setIsHover] = React.useState(false);

  const showPostDetail = () => {
    if (onHomepage)
      setSearchParams({
        id: String(postItem.id),
      });
    else navigate(`${RouteUtils.getPath('postDetail')}/${postItem.id}`);
    setSelectedPost(postItem);
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
          {postItem.similar && (
            <Progress
              className={cx('card__info__matching-percent')}
              type='circle'
              percent={postItem.similar * 100}
              format={(percent) => `${percent?.toFixed(0)}%`}
            />
          )}
          <div className={cx('card__info-content')}>
            <div className={cx('content-item')}>
              <span>FullName: </span>
              {postItem.fullName}
            </div>
            {postItem.nickname && (
              <div className={cx('content-item')}>
                <span>Nick name: </span>
                {postItem.nickname}
              </div>
            )}

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
            gender={postItem.owner.gender}
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
    </div>
  );
});
