import { UserAvatar } from '@/components/UserAvatar';
import React from 'react';
import classNames from 'classnames';
import styles from './ReplyComment.scss';
import { ChildComment } from '@/hooks/comments/interface';
import { formatDate, formatUserName } from '@/utils/format.util';

const cx = classNames.bind(styles);

type ReplyCommentProps = {
  childComment: ChildComment;
};

export const ReplyComment = ({
  childComment,
  ...props
}: ReplyCommentProps & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props}>
      <div className='d-flex flex-row justify-content-end'>
        <UserAvatar
          user={childComment.user}
          className='mr-2'
          svgProps={{ width: 18, height: 18 }}
        />
        <div className={cx('reply-comment-container')}>
          <div className='d-flex flex-row align-items-center'>
            <div className={cx('reply-comment-container__user-name')}>
              {formatUserName({ user: childComment.user, option: 'short' })}
            </div>
            <div className={cx('reply-comment-container__comment-date')}>
              {formatDate(childComment.createdAt, 'MMMM d, YYYY')}
            </div>
          </div>
          <p className={cx('reply-comment-container__comment-content')}>
            {childComment.content}
          </p>
        </div>
      </div>
    </div>
  );
};
