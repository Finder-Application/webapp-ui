import { constants } from '@/configs';
import { Skeleton } from 'antd';
import React from 'react';
import { PostLoading } from '../PostList/components/PostLoading';

export const PostListLoadingPlaceHolder = () => {
  return (
    <div className='row flex-wrap justify-content-start align-items-center'>
      <Skeleton className='ml-2 mb-5' paragraph={{ rows: 1 }} />
      {Array.from({ length: constants.RENDERED_POST_SIZE }).map((_, index) => (
        <div key={index} className='col-xl-3 col-lg-4'>
          <PostLoading index={index} />
        </div>
      ))}
    </div>
  );
};
