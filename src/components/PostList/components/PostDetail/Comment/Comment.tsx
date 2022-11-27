import { UserAvatar } from '@/components/UserAvatar';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Comment.scss';
import { ReplyComment } from '../ReplyComment';
import { ReplyIcon, TrashIcon } from '@/components/Icons';
import { CommentInput, CommentInputType } from '../CommentInput';
import { Comment } from '@/hooks/comments/interface';
import { formatDate, formatUserName } from '@/utils/format.util';
import { useDeleteComment } from '@/hooks/comments/query';
import { useGetMe } from '@/hooks/auth/query';
import { FcEmptyTrash } from 'react-icons/fc';

const cx = classNames.bind(styles);

type CommentProps = {
  comment: Comment;
};

export const CommentCpn = (
  props: CommentProps & React.HTMLProps<HTMLDivElement>
) => {
  const { comment, ...CommentProps } = props;
  const [showReply, setShowReply] = useState(false);

  const { mutate } = useDeleteComment();

  const me = useGetMe();

  const userId = me.data?.userId;

  const quantityOfReply = comment.child?.length || 0;

  const onDeleteComment = () => {
    mutate({
      id: comment.id,
    });
  };

  console.log(userId, comment.user.userId);

  return (
    <div {...CommentProps}>
      <div className='d-flex flex-row'>
        <UserAvatar
          user={comment.user}
          className='mr-2'
          svgProps={{ width: 35, height: 30 }}
        />
        <div className='flex-fill'>
          <div className={cx('comment-container')}>
            <div className='d-flex flex-row align-items-center'>
              <div className={cx('comment-container__user-name')}>
                {formatUserName({ user: comment.user, option: 'short' })}
              </div>
              <div className={cx('comment-container__comment-date')}>
                {formatDate(comment.createdAt, 'DD/MM/YYYY HH:mm')}
              </div>
            </div>
            <p className={cx('comment-container__comment-content')}>
              {comment.content}
            </p>
          </div>
          <div
            className={cx('comment-container__reply', 'd-flex flex-row mt-2')}
          >
            <div
              onClick={() => setShowReply(!showReply)}
              className='comment-container__reply--pointer'
            >
              <ReplyIcon className='mr-1' />
              <span className={cx('comment-container__reply-text')}>
                Reply {!showReply && `(${quantityOfReply})`}
              </span>
            </div>
            {userId === comment.user.userId && (
              <div
                onClick={onDeleteComment}
                className='ml-3 d-flex flex-row align-items-center comment-container__reply--pointer'
              >
                <FcEmptyTrash className='mr-1' />
                {/* <TrashIcon color='black' className='mr-2' /> */}
                <span className={cx('comment-container__reply-text')}>
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {showReply && (
        <>
          {comment.child?.map((childComment) => (
            <ReplyComment childComment={childComment} className='my-3' />
          ))}

          <CommentInput
            postId={comment.postId}
            repFor={comment.id}
            type={CommentInputType.REPLY}
          />
        </>
      )}
    </div>
  );
};
