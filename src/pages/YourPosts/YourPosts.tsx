import { AsyncImage } from '@/components';
import {
  ChevronRightIcon,
  ThreeDotsIcon,
  UserProfileIcon,
} from '@/components/Icons';
import { LoadMoreBtn } from '@/components/LoadMoreButton';
import { SettingsPost } from '@/components/PostList/components/PostDetail/SettingsPost/Settings';
import { PostListLoadingPlaceHolder } from '@/components/PostListLoadingPlaceHolder';
import { ROUTES } from '@/configs';
import { useGetPosts } from '@/hooks/post';
import { Post } from '@/hooks/post/interface';
import { Operator } from '@/services/common/types';
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoData } from './components/NoData';
import CommonImages from '@/assets/images/common';

import styles from './YourPosts.module.scss';
import { RouteUtils } from '@/utils/Route.utils';
import { formatUserName } from '@/utils/format.util';
import { SettingScreens } from '../SettingsPage/SettingsPage';
export const cx = classNames.bind(styles);

const YourPosts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const user = useUserStore((state) => state.user);
  const userName = formatUserName({
    user: {
      firstName: user?.firstName,
      middleName: user?.middleName,
      lastName: user?.lastName,
    },
  });

  const [setYourSelectedPost, setSelectedPost] = usePostStore((state) => [
    state.setYourSelectedPost,
    state.setSelectedPost,
  ]);

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess, refetch } =
    useGetPosts({
      take: 8,
      // page: currentPage,
      filter: [
        {
          operator: Operator.Equal,
          field: 'userId',
          value: user.userId.toString(),
        },
      ],
      optionKey: {
        page: currentPage.toString(),
      },
    });

  useEffect(() => {
    if (data && isSuccess) {
      setPosts((state) => {
        const postsFromData = data.pages
          .flatMap((page) => {
            return page.data;
          })
          .filter((item) => {
            const foundIndex = state.findIndex((post) => post.id === item.id);

            if (foundIndex !== -1) {
              state[foundIndex] = item;
            }

            return foundIndex === -1;
          });

        return [...state, ...postsFromData];
      });
    }
  }, [isLoading, isSuccess, hasNextPage, data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const YourPost = (props: { post: Post }) => {
    const { post } = props;

    return (
      <div className={cx('your-posts__body__your-post')}>
        <div
          className={cx('your-posts__body__your-post__image-container')}
          onClick={() => {
            setYourSelectedPost(post);
            navigate(
              `${RouteUtils.getPath('relevantPostsAndResources')}/${post.id}`
            );
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
            {/* <div className='d-flex flex-row align-items-center'>
              <EyesIcon className='mr-2' />
              <span>100</span>
            </div>
            <div className={cx('your-posts__body__your-post__v-divider')}></div> */}
            <div
              className='d-flex flex-row align-items-center'
              style={{ cursor: 'pointer' }}
            >
              <SettingsPost
                postId={post.id}
                onViewDetail={() => setSelectedPost(post)}
                onEdit={() => setSelectedPost(post)}
                onDelete={async () => {
                  await refetch();
                  setPosts((state) =>
                    state.filter((item) => item.id !== post.id)
                  );
                }}
              >
                <ThreeDotsIcon />
              </SettingsPost>
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
        <img
          src={CommonImages.yourPostsBanner}
          className={cx('your-posts__header__banner')}
        />
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <AsyncImage
            className={cx('your-posts__header__avatar')}
            src={user?.avatar}
          />
          <h4 className={cx('your-posts__header__name', 'mt-2')}>{userName}</h4>
          <div
            className={cx('your-posts__header__edit')}
            onClick={() => {
              navigate(
                `${RouteUtils.getPath('settings')}/${SettingScreens.GENERAL}`
              );
            }}
          >
            Edit Profile <ChevronRightIcon className='ml-2' />
          </div>
        </div>
      </div>
      <hr />
      {filteredPost.length > 0 ? (
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
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default YourPosts;
