import React from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { AsyncImage } from '@/components';
import { Post as PostProps } from '@/hooks/post/interface';
import { UserUtils } from '@/utils/User.utils';
import { formatDistance } from 'date-fns';
import { UserAvatar } from '@/components/UserAvatar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { RouteUtils } from '@/utils/Route.utils';
import _capitalize from 'lodash/capitalize';
const cx = classNames.bind(styles);

const Post = ({
  description,
  owner,
  title,
  missingAddress,
  photos,
  createdAt,
  id,
}: PostProps) => {
  const navigate = useNavigate();
  const showPostDetail = () => {
    navigate(`${RouteUtils.getPath('postDetail')}/${id}`);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header', 'd-flex justify-content-between')}>
        <div className={cx('header__info')}>
          <div className={cx('header__avt')}>
            <UserAvatar user={owner} placement='bottomLeft' />
            <span className={cx('header__fullName')}>
              {UserUtils.getFullName(owner) || 'Truong Thanh Huy'}
            </span>
          </div>
          <div
            className={cx('header__location')}
          >{`${missingAddress.state},${missingAddress.region}`}</div>
        </div>
        <div className='d-flex align-items-center'>
          <span
            style={{
              color: '#99999',
            }}
          >
            {_capitalize(
              formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })
            )}
          </span>

          <div className={cx('icon')}>
            <BsThreeDotsVertical
              style={{
                fontSize: 20,
              }}
            />
          </div>
        </div>
      </div>

      <div className={cx('content')}>
        <h4 className={cx('title')}>
          <strong>{title}</strong>
        </h4>
        <span className={cx('description')}>{description}</span>
        <div className={cx('photos', 'd-flex justify-content-center')}>
          {photos.length > 0 && (
            <AsyncImage
              style={{
                width: '55rem',
                height: '40rem',
                borderRadius: 15,
                marginTop: 10,
              }}
              src={photos[0]}
            />
          )}
        </div>
      </div>

      <div className='' onClick={showPostDetail}>
        See More
      </div>
    </div>
  );
};

export default Post;
