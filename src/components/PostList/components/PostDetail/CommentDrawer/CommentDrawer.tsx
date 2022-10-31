import { CloseIcon } from '@/components/Icons';
import { uesGetInfiComments, useCreateComment } from '@/hooks/comments/query';
import { usePostStore } from '@/store/post';
import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { CommentCpn } from '../Comment';
import { CommentInput } from '../CommentInput';
import { ShareToolTipButton } from '../PostDetail';
import styles from './CommentDrawer.scss';

const cx = classNames.bind(styles);

type CommentDrawerProps = {
  visible?: boolean;
  onClose?: () => void;
  postId: number;
};

export const CommentDrawer = (
  props: CommentDrawerProps & React.HTMLProps<HTMLDivElement>
) => {
  const { visible = false, onClose, postId } = props;
  const setIsShowSharingPopup = usePostStore(
    (state) => state.setIsShowSharingPopup
  );

  const { data, fetchNextPage, hasNextPage, isLoading } = uesGetInfiComments({
    take: 20,
    order: {
      field: 'createdAt',
      direction: 'DESC',
    },
    optionKey: { key: 'id', value: postId.toString() },
  });

  return (
    <div className={cx('comment-drawer-container')}>
      <Button
        className={cx(
          'comment-drawer-container__close-button',
          !visible && 'comment-drawer-container__close-button__inactive'
        )}
        onClick={onClose}
      >
        <CloseIcon width={10} height={10} />
      </Button>
      <div
        className={cx(
          'comment-drawer-container__comment-drawer px-2',
          !visible && 'comment-drawer-container__comment-drawer__inactive'
        )}
      >
        <div className='d-flex flex-row mt-4 ml-3 justify-content-end'>
          <ShareToolTipButton
            className='mr-3'
            onClick={() => setIsShowSharingPopup(true)}
          />
        </div>
        <CommentInput postId={postId} className='ml-2 mt-5 mr-3 mb-5' />

        {data?.pages.map((page) => {
          return page.data.map((comment) => {
            return (
              <CommentCpn className='py-2' comment={comment} key={comment.id} />
            );
          });
        })}

        {hasNextPage && (
          <div
            className='d-flex justify-content-center py-1 comment-drawer-container__btn'
            onClick={() => fetchNextPage()}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </div>
        )}
      </div>
    </div>
  );
};
