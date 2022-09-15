import React from 'react';
import { Post } from './Post/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from 'PostList.module.scss';
import { constants } from '@/configs';
import { PostLoading } from './Post/PostLoading';
export const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setPosts(posts.concat(Array.from({ length: constants.POST_RENDER })));
    }, 1500);
  };

  const renderLoadingListPost = () => {
    return (
      <div className='row flex-wrap'>
        {Array.from({ length: constants.POST_RENDER }).map((_, index) => (
          <div className='col-md-4 col-sm-5' key={index}>
            <PostLoading index={index} />
          </div>
        ))}
      </div>
    );
  };
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={true}
      loader={renderLoadingListPost()}
    >
      <div className='row flex-wrap'>
        {posts.map((_, index) => (
          <div className='col-md-4 col-sm-5' key={index}>
            <Post index={index} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};
