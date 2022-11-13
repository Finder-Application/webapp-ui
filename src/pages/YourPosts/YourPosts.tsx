import { AsyncImage } from '@/components';
import {
  ChatIcon,
  ChevronRightIcon,
  EyesIcon,
  UserProfileIcon,
} from '@/components/Icons';
import { LoadMoreBtn } from '@/components/LoadMoreButton';
import { ROUTES } from '@/configs';
import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './YourPosts.module.scss';
const cx = classNames.bind(styles);

const YourPosts = () => {
  const navigate = useNavigate();

  const YourPost = () => {
    return (
      <div className={cx('your-posts__body__your-post')}>
        <div
          className={cx('your-posts__body__your-post__image-container')}
          onClick={() => navigate(ROUTES.relevantPostsAndResources)}
        >
          <AsyncImage
            className={cx(
              'your-posts__body__your-post__image-container__image'
            )}
            src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
          />
        </div>

        <div className='d-flex flex-row align-items-center justify-content-between mt-2'>
          <div className='d-flex flex-row align-items-center'>
            <UserProfileIcon className='mr-2' />
            Robert Downey
          </div>
          <div className='d-flex flex-row align-items-center'>
            <div className='d-flex flex-row align-items-center'>
              <EyesIcon className='mr-2' />
              <span>100</span>
            </div>
            <div className={cx('your-posts__body__your-post__v-divider')}></div>
            <div className='d-flex flex-row align-items-center'>
              <ChatIcon className='mr-2' />
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={cx('your-posts')}>
      <div className={cx('your-posts__header')}>
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <AsyncImage
            className={cx('your-posts__header__avatar')}
            src='https://image.cnbcfm.com/api/v1/image/106689818-1599150563582-musk.jpg?v=1653411695'
          />
          <h4 className='mt-2'>Jaminle D</h4>
          <div className={cx('your-posts__header__edit')}>
            Edit Profile <ChevronRightIcon className='ml-2' />
          </div>
        </div>
      </div>
      <hr />
      <div className={cx('your-posts__body')}>
        {Array(10)
          .fill(null)
          .map(() => (
            <YourPost />
          ))}
        <LoadMoreBtn />
      </div>
    </div>
  );
};

export default YourPosts;
