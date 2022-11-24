import { constants } from '@/configs';
import { PostEntity } from '@/entites/Post';
import { Filter } from '@/hooks/interfaces';
import { useGetPosts } from '@/hooks/post';
import { Post } from '@/hooks/post/interface';
import { Operator } from '@/services/common/types';
import { useAppStore } from '@/store/app';
import React, { memo, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoResultsFound } from '../NoResult';
import { Post as PostComponent } from './components/Post/Post';
import { PostLoading } from './components/PostLoading';

type PostListProps = {
  filter: {
    gender?: number;
    region?: string;
  };
};
export const PostList = memo((props: PostListProps) => {
  const { filter } = props;

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState(1);
  const [itemCount, setItemCount] = useState(1);

  const searchKeyWords = useAppStore((state) => state.globalSearchingKeyWords);

  const getPostsFilter: Filter<PostEntity>[] = useMemo(() => {
    return searchKeyWords
      ? [
          {
            operator: Operator.Like,
            field: 'title',
            value: `%${searchKeyWords}%`,
          },
        ]
      : [];
  }, [searchKeyWords]);

  // Need to check again, the useQuery Key receives an object (here is getPostsFilter) as dependencies but not trigger calling
  // when the component rerender. Is it use deep compare?
  const { data, fetchNextPage, hasNextPage, isSuccess, isLoading } =
    useGetPosts({
      page: currentPage,
      take: constants.RENDERED_POST_SIZE,
      filter: getPostsFilter,
    });

  const resetPagination = () => {
    setPosts([]);
    setCurrentPage(1);
    setPageCount(1);
    setItemCount(1);
  };

  useEffect(() => {
    resetPagination();
  }, [searchKeyWords]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setPosts((state) => {
        const postsFromData = data.pages
          .flatMap((page) => {
            setPageCount(page.meta.pageCount);
            setItemCount(page.meta.itemCount);
            return page.data;
          })
          .filter((item) => !state.some((post) => post.id === item.id));
        return [...state, ...postsFromData];
      });
    }
  }, [isLoading, isSuccess, hasNextPage, data]);

  const renderLoadingListPost = () => {
    return (
      <div className='row flex-wrap justify-content-start align-items-center'>
        {Array.from({ length: constants.RENDERED_POST_SIZE }).map(
          (_, index) => (
            <div key={index} className='col-xl-3 col-lg-4'>
              <PostLoading index={index} />
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
    })
    .sort((post1, post2) => {
      if (post1.createdAt && post2.createdAt) {
        var date1 = new Date(post1.createdAt);
        var date2 = new Date(post2.createdAt);
        return date2.getTime() - date1.getTime();
      }
      return 0;
    });

  return (
    <>
      {
        <InfiniteScroll
          dataLength={filteredPost.length}
          next={() => {
            fetchNextPage();
            currentPage < pageCount && setCurrentPage((state) => state + 1);
          }}
          hasMore={posts.length !== itemCount}
          loader={renderLoadingListPost()}
        >
          <div className='row flex-wrap justify-content-start align-items-center'>
            {filteredPost.map((post, index) => (
              <div key={post.id.toString()} className='col-xl-4 col-lg-3'>
                <PostComponent postItem={post} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      }
      {data && filteredPost.length === 0 && !hasNextPage && <NoResultsFound />}
    </>
  );
});
