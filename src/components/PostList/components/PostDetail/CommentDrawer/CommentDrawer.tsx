import { CloseIcon } from '@/components/Icons';
import { usePostStore } from '@/store/post';
import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Comment } from '../Comment';
import { CommentInput } from '../CommentInput';
import { ShareToolTipButton } from '../PostDetail';
import styles from './CommentDrawer.scss';

const cx = classNames.bind(styles);

type CommentDrawerProps = {
  visible?: boolean;
  onClose?: () => void;
};

export const CommentDrawer = (
  props: CommentDrawerProps & React.HTMLProps<HTMLDivElement>
) => {
  const { visible = false, onClose } = props;
  const setIsShowSharingPopup = usePostStore(
    (state) => state.setIsShowSharingPopup
  );

  return (
    <div className={cx('comment-drawer-container')}>
      <Button
        className={cx(
          'comment-drawer-container__close-button',
          !visible && 'comment-drawer-container__close-button__inactive'
        )}
        onClick={onClose}
      >
        <CloseIcon width={15} height={15} />
      </Button>
      <div
        className={cx(
          'comment-drawer-container__comment-drawer',
          !visible && 'comment-drawer-container__comment-drawer__inactive'
        )}
      >
        <div className='d-flex flex-row mt-4 ml-3 justify-content-end'>
          <ShareToolTipButton
            className='mr-3'
            onClick={() => setIsShowSharingPopup(true)}
          />
        </div>
        <CommentInput className='ml-2 mt-5 mr-3 mb-5' />

        <Comment className='mx-3 mb-4' />
        <Comment className='mx-3 mb-4' />
        <Comment className='mx-3 mb-4' />
        <Comment className='mx-3 mb-4' />
        <Comment className='mx-3 mb-4' />
      </div>
    </div>
  );
};
