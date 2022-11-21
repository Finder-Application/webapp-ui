import { ButtonFinder } from '@/components';
import { ROUTES } from '@/configs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '../YourPosts';

export const NoData = () => {
  const navigate = useNavigate();

  return (
    <div className={cx('your-posts__no-data', 'mt-5')}>
      <div className={cx('your-posts__no-data__uploading-box')}>
        <h4>Start looking for your relatives</h4>
        <p className={cx('your-posts__no-data__uploading-box__subtitle')}>
          If you are looking for someone and trying to find a way to do it,
          Finder is your great choice.
        </p>
        <ButtonFinder
          className={cx('your-posts__no-data__uploading-box__upload-btn')}
          onClick={() => navigate(ROUTES.createPost)}
        >
          Start looking for your relatives
        </ButtonFinder>
      </div>
      {Array(7)
        .fill(null)
        .map(() => (
          <div className={cx('your-posts__no-data__place-holder-box')} />
        ))}
    </div>
  );
};
