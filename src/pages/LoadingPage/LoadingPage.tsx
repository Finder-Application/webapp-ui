import commonImages from '@/assets/images/common';
import React from 'react';

const LoadingPage = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{
        height: '300px',
      }}
    >
      <img
        src={commonImages.loading}
        alt='loading'
        style={{
          borderRadius: '2rem',
          height: '10rem',
        }}
      />
    </div>
  );
};

export default LoadingPage;
