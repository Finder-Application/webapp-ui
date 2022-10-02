import { UserAvatar } from '@/components/UserAvatar';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Comment.scss';
import { ReplyComment } from '../ReplyComment';
import { ReplyIcon } from '@/components/Icons';
import { CommentInput, CommentInputType } from '../CommentInput';

const cx = classNames.bind(styles);

type CommentProps = {};

export const Comment = (
  props: CommentProps & React.HTMLProps<HTMLDivElement>
) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div {...props}>
      <div className='d-flex flex-row'>
        <UserAvatar className='mr-2' svgProps={{ width: 35, height: 30 }} />
        <div>
          <div className={cx('comment-container')}>
            <div className='d-flex flex-row align-items-center'>
              <div className={cx('comment-container__user-name')}>
                Anna Scot
              </div>
              <div className={cx('comment-container__comment-date')}>
                Jan 26
              </div>
            </div>
            <p className={cx('comment-container__comment-content')}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div
            className={cx('comment-container__reply', 'd-flex flex-row mt-2')}
            onClick={() => setShowReply(true)}
          >
            <ReplyIcon className='mr-2' />
            <span className={cx('comment-container__reply-text')}>
              Reply {!showReply && '(1)'}
            </span>
          </div>
        </div>
      </div>
      {showReply && (
        <>
          <ReplyComment className='my-3' />
          <CommentInput type={CommentInputType.REPLY} />
        </>
      )}
    </div>
  );
};
