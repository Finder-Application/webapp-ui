import { NoResultsFound, Post as PostComponent } from '@/components';
import { LoadMoreBtn } from '@/components/LoadMoreButton';
import { Post } from '@/hooks/post/interface';
import { useRelevantPosts } from '@/hooks/relevants/queries';
import React, { useEffect, useState } from 'react';
import { constants } from '@/configs';
import { PostLoading } from '@/components/PostList/components/PostLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from 'antd';
import { usePostStore } from '@/store/post';
import { PostListLoadingPlaceHolder } from '@/components/PostListLoadingPlaceHolder';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const NUMBER_OF_TAKEN_ITEMS = 5;

export const RelevantPosts = (props: Props) => {
  const yourSelectedPost = usePostStore((state) => state.yourSelectedPost);

  const { data, isSuccess, isLoading } = useRelevantPosts({
    id: yourSelectedPost?.id || -1,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentTakenIndex, setCurrentTakenIndex] = useState(0);

  useEffect(() => {
    if (data) {
      if (currentTakenIndex >= posts.length) {
        if (currentTakenIndex + NUMBER_OF_TAKEN_ITEMS >= data.length - 1) {
          setPosts([...data]);
        } else {
          const start = currentTakenIndex;
          const end = currentTakenIndex + NUMBER_OF_TAKEN_ITEMS;
          const slicedPosts = data.slice(start, end);

          setPosts((state) => [...state, ...slicedPosts]);
        }
      }
    }
  }, [currentTakenIndex, data, isSuccess]);

  return (
    <div {...props}>
      {isLoading ? (
        <PostListLoadingPlaceHolder />
      ) : (
        <>
          <div style={{ fontSize: '1.5rem' }} className='mb-5'>
            There are{' '}
            <span className='font-italic'>{data?.length} post results</span>{' '}
            relating to your post&nbsp;
            <span className='font-weight-bold'>{yourSelectedPost?.title}</span>
          </div>
          {data?.length === 0 ? (
            <div className='d-flex flex-column align-items-center justify-content-center w-100'>
              <NoResultsFound />
            </div>
          ) : (
            <>
              <div className='d-flex row flex-wrap justify-content-start align-items-center'>
                {posts.map((post, index) => (
                  <div key={post.id.toString()} className='col-xl-3 col-lg-4'>
                    <PostComponent postItem={post} />
                  </div>
                ))}
              </div>
              {data && posts.length !== data.length && (
                <LoadMoreBtn
                  onClick={() =>
                    setCurrentTakenIndex(
                      (state) => state + NUMBER_OF_TAKEN_ITEMS
                    )
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
