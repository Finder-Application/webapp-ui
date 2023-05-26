import React from 'react';
import classNames from 'classnames/bind';
import styles from './TopFinder.module.scss';
import { useGetPosts } from '@/hooks/post';
import { isNull, omitBy } from 'lodash';
import { AsyncImage } from '@/components';
import { useNavigate } from 'react-router-dom';
import { RouteUtils } from '@/utils/Route.utils';

const cx = classNames.bind(styles);

const TopFinder = () => {
  const MAX = 4;
  const MAX_LENGTH = 150;
  const query = omitBy(
    {
      take: MAX,
      order: { field: 'createdAt', direction: 'DESC' },
    },
    isNull
  );
  const { data: resData } = useGetPosts(query);
  const postList = resData?.pages[0].data;

  const navigate = useNavigate();
  return (
    <div className={cx('wrapper')}>
      <div
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          margin: '20px 0',
        }}
      >
        Top Finder
      </div>
      {postList?.map((post) => (
        <>
          <div className='d-flex'>
            <AsyncImage
              src={post.owner.avatar}
              avatar
              style={{
                height: 50,
                width: 50,
              }}
            />
            <div className={cx('content')}>
              <div
                className={cx('title', 'd-flex ml-2')}
                style={{
                  height: 50,
                  alignItems: 'center',
                }}
                onClick={() =>
                  navigate(`${RouteUtils.getPath('postDetail')}/${post.id}`)
                }
              >
                <h6>
                  <strong>{post.title}</strong>
                </h6>
              </div>
              <div className={cx('description')}>
                {post.description.slice(0, MAX_LENGTH) + '...'}
              </div>
            </div>
          </div>

          <div
            style={{
              borderBottom: '1px solid #6c757d52',
              marginBottom: 20,
            }}
          ></div>
        </>
      ))}
    </div>
  );
};

export default TopFinder;
