import { constants, SEARCH_QUERY } from '@/configs';
import { PostEntity } from '@/entites/Post';
import { Filter } from '@/hooks/interfaces';
import { useGetPosts } from '@/hooks/post';
import { Post } from '@/hooks/post/interface';
import { Operator } from '@/services/common/types';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { NoResultsFound } from '../NoResult';
import { PostLoading } from './components/PostLoading';
import { omitBy, isNull } from 'lodash';
import { default as PostComponent } from '@/containers/home/Post/Post';

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

  const [itemCount, setItemCount] = useState(1);

  const [searchParams] = useSearchParams();
  const searchKeyWords = searchParams.get(SEARCH_QUERY);

  const postsToFilter: Filter<PostEntity>[] = useMemo(() => {
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

    return [...gender, ...residence, ...birthYear];
  }, [filter]);

  const search = useMemo(() => {
    const searchingFields = [
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

    return {
      search: searchKeyWords,
      fields: searchingFields,
    };
  }, [searchKeyWords]);

  const query = omitBy(
    {
      take: constants.RENDERED_POST_SIZE,
      filter: postsToFilter,
      order: { field: 'createdAt', direction: 'DESC' },
      q: searchKeyWords ? JSON.stringify(search) : null,
    },
    isNull
  );

  // Need to check again, the useQuery Key receives an object (here is postsToFilter) as dependencies but not trigger calling
  // when the component rerender. Is it use deep compare?
  const { data, fetchNextPage, hasNextPage, isSuccess, isLoading } =
    useGetPosts({ ...query });

  const resetPagination = () => {
    setPosts([]);
    setItemCount(1);
  };

  useEffect(() => {
    resetPagination();
  }, [searchKeyWords, filter]);

  useEffect(() => {
    if (data && isSuccess) {
      setPosts((state) => {
        const postsFromData = data.pages
          .flatMap((page) => {
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
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage || posts.length !== itemCount}
          // loader={renderLoadingListPost()}
        >
          <div
            className='row gap-5 flex-column justify-content-start align-items-center'
            style={{
              gap: 20,
            }}
          >
            {posts.map((post, index) => (
              <div key={post.id.toString()}>
                <PostComponent {...post} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      }
      {data && posts.length === 0 && !hasNextPage && <NoResultsFound />}
    </>
  );
});
