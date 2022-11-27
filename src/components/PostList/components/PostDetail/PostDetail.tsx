import {
  CalendarIcon,
  CloseIcon,
  CommentIcon,
  ContactIcon,
  DocumentIcon,
  ShareIcon,
} from '@/components/Icons';
import { useWindowSize } from '@/hooks';
import { Button, Divider, Drawer, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import toNumber from 'lodash/toNumber';
import styles from './PostDetail.module.scss';

import { ButtonFinder } from '@/components/ButtonFinder';
import { UserAvatar } from '@/components/UserAvatar';
import { TOOL_TIP_zINDEX } from '@/configs/constants';
import { useGetPostDetail } from '@/hooks/post';
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import { formatDate } from '@/utils/format.util';
import { useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CommentDrawer } from './CommentDrawer';
import { ContactInform } from './ContactInform';
import { ImageSlider } from './ImageSlider';
import { MissingInform } from './MissingInform';
import { PostDetailPlaceholder } from './PostDetailPlaceholder';
import { SettingsPost } from './SettingsPost/Settings';
import { SharingPopup } from './SharingPopup';
import { ROUTES } from '@/configs';

export const cnPostDetail = classNames.bind(styles);
interface PostDetailProps {
  id: number | string;
}

export const ShareToolTipButton = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props}>
      <Tooltip
        placement='leftTop'
        title='Share'
        trigger='hover'
        zIndex={TOOL_TIP_zINDEX}
        overlayInnerStyle={{ padding: '0.5em 2em' }}
      >
        <Button
          className={cnPostDetail('post-detail__interaction-items__item')}
        >
          <ShareIcon width={15} height={15} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const CommentTooltipButton = (
  props: React.HTMLProps<HTMLDivElement> & { total: number }
) => {
  const { onClick, total } = props;
  return (
    <div {...props}>
      <Tooltip
        placement='leftTop'
        title='Comments'
        trigger='hover'
        zIndex={TOOL_TIP_zINDEX}
        overlayInnerStyle={{ padding: '0.5em 2em' }}
      >
        <Button
          className={cnPostDetail('post-detail__interaction-items__item')}
          onClick={onClick}
        >
          <div
            className={cnPostDetail(
              'post-detail__interaction-items__item__comments-count'
            )}
          >
            {/* TODO: change thi in the api response get all post */}
            {total}
          </div>
          <CommentIcon width={15} height={15} />
        </Button>
      </Tooltip>
    </div>
  );
};

const POP_TO_HEADER_HEIGHT = 50;

const PostDetail = (props: PostDetailProps) => {
  const { id } = props;
  const navigate = useNavigate();
  const { id: post_id } = useParams<{ id: string }>();
  const { height, width } = useWindowSize();
  const setSearchParams = useSearchParams()[1];
  const postID = id || post_id;

  const user = useUserStore((state) => state.user);
  const [totalNoti, settTotalNoti] = useState(0);
  const [showCommentDrawer, setShowCommentDrawer] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const setIsShowSharingPopup = usePostStore(
    (state) => state.setIsShowSharingPopup
  );
  const { data, isLoading } = useGetPostDetail(Number(postID));
  const ownerName =
    (data?.owner.firstName || '') +
    ' ' +
    (data?.owner.middleName || '') +
    ' ' +
    (data?.owner.lastName || '');

  const onCloseCommentDrawer = () => {
    setShowCommentDrawer(false);
  };

  const onOpenCommentDrawer = () => {
    setShowCommentDrawer(true);
  };

  const showSharingPopupModal = () => {
    setIsShowSharingPopup(true);
  };
  const handleClosePostDetail = async () => {
    if (post_id) {
      return navigate(-1);
    }
    setSearchParams({});
    setIsLoadingDelete(false);
  };

  return (
    <Drawer
      placement={'bottom'}
      width={width}
      open={!!postID}
      className={cnPostDetail('post-detail')}
      height={toNumber(height) - POP_TO_HEADER_HEIGHT}
      onClose={handleClosePostDetail}
      headerStyle={{ display: 'none' }}
    >
      {(!data && isLoading) || isLoadingDelete ? (
        <PostDetailPlaceholder />
      ) : (
        <>
          <SharingPopup
            photo={data?.photos[0]}
            postId={String(postID)}
            title={String(data?.title)}
          />
          <CloseIcon
            onClick={handleClosePostDetail}
            className={cnPostDetail('post-detail__close-icon')}
          />
          <div
            className={cnPostDetail(
              'post-detail__interaction-items',
              showCommentDrawer && 'post-detail__interaction-items__inactive'
            )}
          >
            <UserAvatar user={data?.owner} />
            <CommentTooltipButton
              total={totalNoti}
              className='my-4'
              onClick={onOpenCommentDrawer}
            />
            <ShareToolTipButton onClick={showSharingPopupModal} />
            {data?.owner.userId === user?.userId && (
              <SettingsPost
                postId={Number(id)}
                setIsLoading={() => setIsLoadingDelete(true)}
                onDelete={handleClosePostDetail}
                className='my-4'
              >
                <ButtonFinder
                  className={cnPostDetail(
                    'post-detail__interaction-items__item'
                  )}
                >
                  <AiOutlineSetting width={15} height={15} />
                </ButtonFinder>
              </SettingsPost>
            )}
          </div>
          <div
            className={cnPostDetail(
              'post-detail__main-content',
              showCommentDrawer && 'post-detail__main-content__active'
            )}
          >
            <div className={showCommentDrawer ? 'col-9' : 'col-11'}>
              <h1 className='font-weight-bold'>{data?.title}</h1>
              <hr />
              <div className='mt-4 mb-5 d-flex flex-row align-items-center'>
                <div className='d-flex flex-row align-items-center'>
                  <UserAvatar placement='bottomLeft' user={data?.owner} />
                  <div className='ml-2 font-weight-bold'>{ownerName}</div>
                </div>
                <Divider
                  className='mx-3'
                  style={{ backgroundColor: 'var(--grey-3)' }}
                  type='vertical'
                />
                <div
                  className='d-flex flex-row align-items-center'
                  style={{ color: 'var(--grey-4)' }}
                >
                  <CalendarIcon className='mr-2' />
                  <div>
                    {formatDate(
                      new Date(data?.updatedAt.toString() || ''),
                      'LLL'
                    )}
                  </div>
                </div>
              </div>
              <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className={cnPostDetail('wrapper-slider')}>
                  <ImageSlider
                    images={
                      data?.photos
                        ? data?.photos?.map((photo, index) => ({
                            id: index,
                            src: photo,
                            alt: 'user_photo',
                          }))
                        : []
                    }
                  />
                </div>
                <MissingInform
                  inform={data}
                  className={cnPostDetail('ml-5', 'missing-form')}
                />
              </div>

              <div className='mt-5 mb-4 d-flex flex-row align-items-center'>
                <DocumentIcon />
                <h5 className='m-0 ml-3 font-weight-bold'>Description</h5>
              </div>
              <p>{data?.description ?? 'No description'}</p>

              <div className='mt-5 mb-4 d-flex flex-row align-items-center'>
                <ContactIcon />
                <h5 className='m-0 ml-3 font-weight-bold'>
                  Contact Information
                </h5>
              </div>
              <ContactInform owner={data?.owner} />
            </div>
          </div>

          <CommentDrawer
            visible={showCommentDrawer}
            onClose={onCloseCommentDrawer}
            postId={data?.id || 0}
            settTotalNoti={settTotalNoti}
          />
        </>
      )}
    </Drawer>
  );
};

export default PostDetail;
