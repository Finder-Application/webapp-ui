import commonImages from '@/assets/images/common';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className='d-flex justify-content-center'>
      <img
        src={commonImages.loading}
        alt='loading'
        style={{
          borderRadius: '2rem',
        }}
      />
    </div>
  );
};

export default LoadingPage;
