import React from 'react';
import { Post } from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from 'PostList.module.scss';
export const PostList = () => {
  const [posts, setPosts] = React.useState(
    Array.from({
      length: 6,
    })
  );

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setPosts(posts.concat(Array.from({ length: 20 })));
    }, 1500);
  };
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div className='row flex-wrap'>
        {posts.map((_, index) => (
          <div className='col-md-4'>
            <Post key={index} index={index} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};
