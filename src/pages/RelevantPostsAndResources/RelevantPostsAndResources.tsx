import { ArrowLeftIcon } from '@/components/Icons/ArrowLeft';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contents } from './components/Contents';
import { RelevantResourcesMenu } from './components/Menu';

const RelevantPostsAndResources = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-row'>
      <div className='mr-5'>
        <ArrowLeftIcon
          style={{ cursor: 'pointer' }}
          className='mb-5'
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              // the current entry in the history stack will be replaced with the new one with { replace: true }
              navigate('/', { replace: true });
            }
          }}
        />
        <RelevantResourcesMenu />
      </div>
      <Contents />
    </div>
  );
};

export default RelevantPostsAndResources;
