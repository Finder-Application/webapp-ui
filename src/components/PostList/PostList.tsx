import React from 'react';
import { Post } from './components/Post/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from 'PostList.module.scss';
import { constants } from '@/configs';
import { PostLoading } from './components/PostLoading';
export const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setPosts(posts.concat(Array.from({ length: constants.POST_RENDER })));
    }, 1500);
  };

  React.useEffect(() => {
    let timer = setTimeout(() => {
      setPosts(posts.concat(Array.from({ length: constants.POST_RENDER })));
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const renderLoadingListPost = () => {
    return (
      <div className='row flex-wrap justify-content-start align-items-center'>
        {Array.from({ length: constants.POST_RENDER }).map((_, index) => (
          <PostLoading key={index} index={index} />
        ))}
      </div>
    );
  };
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={false}
      loader={renderLoadingListPost()}
    >
      <div className='row flex-wrap justify-content-start align-items-center'>
        {posts.map((_, index) => (
          <Post key={index} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
