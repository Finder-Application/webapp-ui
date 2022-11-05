import { constants } from '@/configs';
import { useGetPosts } from '@/hooks/post';
import { Post } from '@/hooks/post/interface';
import { Operator } from '@/services/common/types';
import { uuid } from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AsyncImage } from '../AsyncImage';
import { NoResultsFound } from '../NoResult';
import { Post as PostComponent } from './components/Post/Post';
import { PostLoading } from './components/PostLoading';

type PostListProps = {
  filter: {
    gender?: number;
    region?: string;
  };
};
export const PostList = (props: PostListProps) => {
  const { filter } = props;

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState(1);
  const [itemCount, setItemCount] = useState(1);

  const { data, fetchNextPage, hasNextPage, isSuccess, isLoading } =
    useGetPosts({
      page: currentPage,
      take: 10,
    });

  useEffect(() => {
    if (data && isSuccess) {
      const postsFromData = data.pages
        .flatMap((page) => {
          setPageCount(page.meta.pageCount);
          setItemCount(page.meta.itemCount);
          return page.data;
        })
        .filter((item) => !posts.some((post) => post.id === item.id));

      setPosts((state) => [...state, ...postsFromData]);
    }
  }, [isLoading, isSuccess]);

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

  const filteredPost = posts
    .filter((post, index) => {
      // Filter duplicates items
      return posts.indexOf(post) === index;
    })
    .filter((post, index) => {
      if (filter.region && filter.gender !== undefined) {
        return (
          post.hometown.region === filter.region &&
          post.gender === +filter.gender
        );
      }
      if (filter.region) {
        return post.hometown.region === filter.region;
      }
      if (filter.gender !== undefined) {
        return post.gender === +filter.gender;
      }

      return true;
    });

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => {
          fetchNextPage();
          currentPage < pageCount && setCurrentPage((state) => state + 1);
        }}
        hasMore={posts.length !== itemCount}
        loader={renderLoadingListPost()}
      >
        <div className='row flex-wrap justify-content-start align-items-center'>
          {filteredPost.length > 0 &&
            filteredPost.map((post, index) => (
              <div key={post.id.toString()} className='col-xl-3 col-lg-4'>
                <PostComponent postItem={post} key={post.id.toString()} />
              </div>
            ))}
        </div>
      </InfiniteScroll>
      {data && filteredPost.length === 0 && !hasNextPage && <NoResultsFound />}
    </>
  );
};
