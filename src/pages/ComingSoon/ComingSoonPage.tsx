import commonImages from '@/assets/images/common';
import { AsyncImage } from '@/components';
import React from 'react';

const ComingSoonPage = () => {
  return (
    <div className='d-flex justify-content-center'>
      <AsyncImage
        src={commonImages.comingSoon}
        style={{
          width: '40rem',
        }}
      />
    </div>
  );
};

export default ComingSoonPage;
