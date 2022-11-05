import React from 'react';
import { AsyncImage } from '../AsyncImage';
import PostImages from '@/assets/images/post';
export const NoResultsFound = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <AsyncImage width='30em' src={PostImages.NoResultFound} />
    </div>
  );
};
