import { Skeleton, Space } from 'antd';
import React from 'react';

export const PostDetailPlaceholder = () => {
  return (
    <div>
      <Skeleton paragraph={{ rows: 0 }} />
      <Space>
        <Skeleton.Avatar active />
        <Skeleton.Input active />
      </Space>
      <div className='d-flex flex-row ml-5'>
        <Skeleton.Image
          className='ml-5 mt-4 mr-5'
          active
          style={{ width: '20em', height: '10em' }}
        />
        <Skeleton className=' mt-5' paragraph={{ rows: 4 }} />
      </div>
      <Skeleton className=' mt-5' paragraph={{ rows: 4 }} />
      <Skeleton className=' mt-5' paragraph={{ rows: 4 }} />
    </div>
  );
};
