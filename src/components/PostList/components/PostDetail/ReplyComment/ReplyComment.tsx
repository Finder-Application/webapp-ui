import { UserAvatar } from '@/components/UserAvatar';
import React from 'react';
import classNames from 'classnames';
import styles from './ReplyComment.scss';

const cx = classNames.bind(styles);

type ReplyCommentProps = {};

export const ReplyComment = (
  props: ReplyCommentProps & React.HTMLProps<HTMLDivElement>
) => {
  return (
    <div {...props}>
      <div className='d-flex flex-row justify-content-end'>
        <UserAvatar className='mr-2' svgProps={{ width: 18, height: 18 }} />
        <div className={cx('reply-comment-container')}>
          <div className='d-flex flex-row align-items-center'>
            <div className={cx('reply-comment-container__user-name')}>
              Anna Scot
            </div>
            <div className={cx('reply-comment-container__comment-date')}>
              Jan 26
            </div>
          </div>
          <p className={cx('reply-comment-container__comment-content')}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
    </div>
  );
};
