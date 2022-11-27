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
import { useParams } from 'react-router-dom';
import { useGetPostDetail } from '@/hooks/post';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const NUMBER_OF_TAKEN_ITEMS = 8;

export const RelevantPosts = (props: Props) => {
  const { id: post_id } = useParams<{ id: string }>();

  const { data, isSuccess, isLoading } = useRelevantPosts({
    id: Number(post_id) || -1,
  });

  const { data: yourSelectedPostData, isLoading: isPostDetailLoading } =
    useGetPostDetail(Number(post_id));

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

  const sortedPosts = posts.sort((post1, post2) => {
    if (post1.similar && post2.similar) {
      return post2.similar - post1.similar;
    }
    return 0;
  });

  return (
    <div {...props}>
      {isLoading || isPostDetailLoading ? (
        <PostListLoadingPlaceHolder />
      ) : (
        <>
          <div style={{ fontSize: '1.5rem' }} className='mb-5'>
            There are{' '}
            <span className='font-italic'>{data?.length} post results</span>{' '}
            relating to your post&nbsp;
            <span className='font-weight-bold'>
              {yourSelectedPostData?.title}
            </span>
          </div>
          {data?.length === 0 ? (
            <div className='d-flex flex-column align-items-center justify-content-center w-100'>
              <NoResultsFound />
            </div>
          ) : (
            <>
              <div className='d-flex row flex-wrap justify-content-start align-items-center'>
                {sortedPosts.map((post, index) => (
                  <div key={post.id.toString()} className='col-xl-4 col-lg-4'>
                    <PostComponent postItem={post} onHomepage={false} />
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
