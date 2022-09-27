import { constants } from '@/configs';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from './components/Post/Post';
import { PostLoading } from './components/PostLoading';
export const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPosts(
        posts.concat(Array.from({ length: constants.RENDERED_POST_SIZE }))
      );
    }, 1500);
  };

  React.useEffect(() => {
    fetchMoreData();
  }, []);
  const renderLoadingListPost = () => {
    return (
      <div className='row flex-wrap justify-content-start align-items-center'>
        {Array.from({ length: constants.RENDERED_POST_SIZE }).map(
          (_, index) => (
            <div key={index} className='col-xl-3 col-lg-4'>
              <PostLoading key={index} index={index} />
            </div>
          )
        )}
      </div>
    );
  };
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={posts.length <= 14}
      loader={renderLoadingListPost()}
    >
      <div className='row flex-wrap justify-content-start align-items-center'>
        {posts.map((_, index) => (
          <div key={index} className='col-xl-3 col-lg-4'>
              <Post key={index}  />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};
