import { AsyncImage } from '@/components';
import React from 'react';
import PostImages from '@/assets/images/post';
import { cx } from './CreatePostPage';
import { CloseIcon, TickIcon } from '@/components/Icons';

export const FaceImageExample = () => {
  return (
    <>
      <h4>Missing Person’s face images </h4>
      <div className={cx('create-post__creating-form__face-example-container')}>
        <AsyncImage src={PostImages.FaceExample} />
        <div className='ml-3'>
          <div className='d-flex flex-row align-items-center'>
            <TickIcon className='mr-2' />
            <div
              className={cx(
                'create-post__creating-form__face-example-container__note'
              )}
            >
              The pictures should cover only the face of the missing person
            </div>
          </div>
          <div className='d-flex flex-row align-items-center my-3'>
            <TickIcon className='mr-2' />
            <div
              className={cx(
                'create-post__creating-form__face-example-container__note'
              )}
            >
              Would be better if make the face centered
            </div>
          </div>
          <div className='d-flex flex-row align-items-center'>
            <CloseIcon color='red' width='22' height='16' className='mr-1' />
            <div
              className={cx(
                'create-post__creating-form__face-example-container__note'
              )}
            >
              Would be better if make the face centered
            </div>
          </div>
        </div>
        <div
          className={cx(
            'create-post__creating-form__face-example-container__example'
          )}
        >
          Example
        </div>
      </div>
    </>
  );
};
