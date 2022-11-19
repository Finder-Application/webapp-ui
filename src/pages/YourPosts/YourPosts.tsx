import { AsyncImage } from '@/components';
import {
  ChatIcon,
  ChevronRightIcon,
  EyesIcon,
  TrashIcon,
  UserProfileIcon,
} from '@/components/Icons';
import { LoadMoreBtn } from '@/components/LoadMoreButton';
import { PostListLoadingPlaceHolder } from '@/components/PostListLoadingPlaceHolder';
import { ROUTES } from '@/configs';
import { useDeletePost, useGetPosts } from '@/hooks/post';
import { Post } from '@/hooks/post/interface';
import { Operator } from '@/services/common/types';
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './YourPosts.module.scss';
const cx = classNames.bind(styles);

const YourPosts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const user = useUserStore((state) => state.user);
  const setYourSelectedPost = usePostStore(
    (state) => state.setYourSelectedPost
  );

  const deletePost = useDeletePost();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
  } = useGetPosts({
    take: 8,
    // page: currentPage,
    filter: [
      {
        operator: Operator.Equal,
        field: 'userId',
        // TODO: The user current does not have the userId, only has uuid, replace it when we have userId
        value: '1',
      },
    ],
    optionKey: {
      page: currentPage.toString(),
    },
  });

  useEffect(() => {
    if (data && isSuccess) {
      const postsFromData = data.pages
        .flatMap((page) => {
          return page.data;
        })
        .filter((item) => !posts.some((post) => post.id === item.id));

      setPosts((state) => [...state, ...postsFromData]);
    }
  }, [isLoading, isSuccess, hasNextPage]);

  const YourPost = (props: { post: Post }) => {
    const { post } = props;

    return (
      <div className={cx('your-posts__body__your-post')}>
        <div
          className={cx('your-posts__body__your-post__image-container')}
          onClick={() => {
            setYourSelectedPost(post);
            navigate(ROUTES.relevantPostsAndResources);
          }}
        >
          <AsyncImage
            className={cx(
              'your-posts__body__your-post__image-container__image'
            )}
            src={post.photos[0]}
          />
        </div>

        <div className='d-flex flex-row align-items-center justify-content-between mt-2'>
          <div className='d-flex flex-row align-items-center'>
            <UserProfileIcon className='mr-2' />
            {post.fullName}
          </div>
          <div className='d-flex flex-row align-items-center'>
            <div className='d-flex flex-row align-items-center'>
              <EyesIcon className='mr-2' />
              <span>100</span>
            </div>
            <div className={cx('your-posts__body__your-post__v-divider')}></div>
            <div
              className='d-flex flex-row align-items-center'
              style={{ cursor: 'pointer' }}
              onClick={async () => {
                if (
                  confirm('Are you sure you want to delete this post?') == true
                ) {
                  await deletePost
                    .mutateAsync({ id: post.id })
                    .then(async () => {
                      await refetch();
                      setPosts((state) =>
                        state.filter((item) => item.id !== post.id)
                      );
                    });
                }
              }}
            >
              <TrashIcon color='red' width={15} height={15} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredPost = posts.filter((post, index) => {
    // Filter duplicates items

    return posts.indexOf(post) === index;
  });
  return (
    <div className={cx('your-posts')}>
      <div className={cx('your-posts__header')}>
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <AsyncImage
            className={cx('your-posts__header__avatar')}
            src={user?.avatar}
          />
          <h4 className='mt-2'>{user?.firstName}</h4>
          <div className={cx('your-posts__header__edit')}>
            Edit Profile <ChevronRightIcon className='ml-2' />
          </div>
        </div>
      </div>
      <hr />
      <div className={cx('your-posts__body')}>
        {filteredPost.map((post) => {
          return <YourPost key={post.id} post={post} />;
        })}

        {hasNextPage &&
          (isLoading ? (
            <PostListLoadingPlaceHolder />
          ) : (
            <LoadMoreBtn
              onClick={() => {
                fetchNextPage();
                setCurrentPage((state) => state + 1);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default YourPosts;
