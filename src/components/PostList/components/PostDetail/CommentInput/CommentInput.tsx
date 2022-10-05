import { UserAvatar } from '@/components/UserAvatar';
import { Button, Input } from 'antd';
import React, { useRef } from 'react';
const { TextArea } = Input;

import { ButtonFinder } from '@/components/ButtonFinder';
import { AttachIcon } from '@/components/Icons';
import classNames from 'classnames';
import styles from './CommentInput.scss';

const cx = classNames.bind(styles);

export enum CommentInputType {
  INPUT = 'INPUT',
  REPLY = 'REPLY',
}
type CommentInputProps = {
  type?: CommentInputType;
};

export const CommentInput = (
  props: CommentInputProps & React.HTMLProps<HTMLDivElement>
) => {
  const { type = CommentInputType.INPUT } = props;

  const isInReply = type === CommentInputType.REPLY;
  const attachIconSize = isInReply ? 18 : 20;
  const userAvatarIconSize = isInReply ? 20 : 30;

  const inputImageFile = useRef<HTMLInputElement | null>(null);

  const onUploadFile = () => {
    inputImageFile?.current?.click();
  };

  return (
    <div {...props}>
      <div className='d-flex flex-row justify-content-end'>
        <UserAvatar
          className='mr-2'
          svgProps={{ width: userAvatarIconSize, height: userAvatarIconSize }}
        />
        <div
          className={cx(
            'comment-input-container',
            isInReply && 'comment-input-container--reply-mode'
          )}
        >
          <div className={cx('comment-input-container__input-section')}>
            <TextArea
              className={cx('comment-input-container__input-section__input')}
              bordered={false}
              placeholder='Give a comment...'
              allowClear
              autoSize
            />
            <hr className='mx-2 mb-1' />
            <div className='d-flex flex-row justify-content-end align-items-center mr-2 mb-2'>
              <Button
                onClick={onUploadFile}
                className={cx(
                  'comment-input-container__attach-icon',
                  isInReply &&
                    'comment-input-container__attach-icon--reply-mode'
                )}
              >
                <input
                  type='file'
                  id='file-1'
                  ref={inputImageFile}
                  style={{ display: 'none' }}
                  accept='image/*'
                />
                <AttachIcon width={attachIconSize} height={attachIconSize} />
              </Button>
              {isInReply && (
                <ButtonFinder
                  className={cx(
                    'comment-input-container__comment-btn',
                    'ml-2',
                    isInReply &&
                      'comment-input-container__comment-btn--reply-mode'
                  )}
                >
                  Comment
                </ButtonFinder>
              )}
            </div>
          </div>
          {!isInReply && (
            <div className='d-flex flex-row justify-content-end mt-3'>
              <ButtonFinder
                className={cx('comment-input-container__comment-btn')}
              >
                Comment
              </ButtonFinder>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
