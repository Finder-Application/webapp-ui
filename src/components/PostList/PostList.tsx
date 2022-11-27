import { constants, SEARCH_QUERY } from '@/configs';
import { PostEntity } from '@/entites/Post';
import { Filter } from '@/hooks/interfaces';
import { useGetPosts } from '@/hooks/post';
import { Post } from '@/hooks/post/interface';
import { Operator } from '@/services/common/types';
import { useAppStore } from '@/store/app';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { NoResultsFound } from '../NoResult';
import { Post as PostComponent } from './components/Post/Post';
import { PostLoading } from './components/PostLoading';

type PostListProps = {
  filter: {
    gender?: number;
    residence?: string;
    birthYear?: moment.Moment | null;
  };
  onSetTotalOfSearch: (value: number) => void;
};
export const PostList = memo((props: PostListProps) => {
  const { filter, onSetTotalOfSearch } = props;

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState(1);
  const [itemCount, setItemCount] = useState(1);

  const [searchParams] = useSearchParams();
  const searchKeyWords = searchParams.get(SEARCH_QUERY);

  const postsToFilter: Filter<PostEntity>[] = useMemo(() => {
    const filteringFields = [
      'title',
      'fullName',
      'hometownRegion',
      'hometownState',
      'hometownHamlet',
      'missingRegion',
      'missingState',
      'missingHamlet',
      'missingCommune',
    ] as const;

    const gender =
      filter.gender !== undefined
        ? [
            {
              operator: Operator.Equal,
              field: 'gender' as keyof PostEntity,
              value: `${+filter.gender}`,
            },
          ]
        : [];
    const residence =
      filter.residence !== undefined
        ? [
            {
              operator: Operator.Equal,
              field: 'hometownRegion' as keyof PostEntity,
              value: `${filter.residence}`,
            },
          ]
        : [];
    const birthYear =
      filter.birthYear !== null
        ? [
            {
              operator: Operator.Like,
              field: 'date_of_birth' as keyof PostEntity,
              value: `%${filter.birthYear?.year()}%`,
            },
          ]
        : [];
    const searchInput = searchKeyWords
      ? filteringFields.map((field) => ({
          operator: Operator.Like,
          field,
          value: `%${searchKeyWords.trim()}%`,
        }))
      : [];

    return [...searchInput, ...gender, ...residence, ...birthYear];
  }, [searchKeyWords, filter]);

  // Need to check again, the useQuery Key receives an object (here is postsToFilter) as dependencies but not trigger calling
  // when the component rerender. Is it use deep compare?
  const { data, fetchNextPage, hasNextPage, isSuccess, isLoading } =
    useGetPosts({
      page: currentPage,
      take: constants.RENDERED_POST_SIZE,
      filter: postsToFilter,
      order: { field: 'createdAt', direction: 'DESC' },
    });

  const resetPagination = () => {
    setPosts([]);
    setCurrentPage(1);
    setPageCount(1);
    setItemCount(1);
  };

  useEffect(() => {
    resetPagination();
  }, [searchKeyWords, filter]);

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
            onSetTotalOfSearch(page.meta.itemCount);

            return page.data;
          })
          // This is for getting the not duplicating post.
          // For ex: state = [1, 2, 3], data = [1, 4, 5] => postsFromData = [4, 5];
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

  return (
    <>
      {
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
            {posts.map((post, index) => (
              <div key={post.id.toString()} className='col-xl-4 col-lg-3'>
                <PostComponent postItem={post} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      }
      {data && posts.length === 0 && !hasNextPage && <NoResultsFound />}
    </>
  );
});
