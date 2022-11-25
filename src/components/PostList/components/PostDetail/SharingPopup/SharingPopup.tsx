import React from 'react';
import classNames from 'classnames/bind';
import { usePostStore } from '@/store/post';
import shallow from 'zustand/shallow';
import { Modal } from 'antd';
import { AsyncImage } from '@/components/AsyncImage';
import { FacebookSharingIcon, TwitterIcon } from '@/components/Icons';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import styles from './SharingPopup.module.scss';
import { toast } from 'react-toastify';
import { constants, ROUTES } from '@/configs';

const cx = classNames.bind(styles);

type SharingPopupProps = {
  photo?: string;
  postId: string | number;
  title: string;
};

export const SharingPopup = (
  props: SharingPopupProps & React.HTMLProps<HTMLDivElement>
) => {
  const { photo, postId, title } = props;
  const [isShowSharingPopup, setIsShowSharingPopup] = usePostStore(
    (state) => [state.isShowSharingPopup, state.setIsShowSharingPopup],
    shallow
  );

  async function copyTextToClipboard(label: string, text: string) {
    toast.success(label);
    return await navigator.clipboard.writeText(text);
  }

  const url = `${constants.BASE_URL}${ROUTES.postDetail}/${postId}`;
  return (
    <Modal
      className={cx('share-popup')}
      open={isShowSharingPopup}
      wrapClassName={cx('share-popup')}
      maskStyle={{ zIndex: 999999 }}
      centered
      onCancel={() => setIsShowSharingPopup(false)}
    >
      <div className={cx('share-popup__header')}>
        <AsyncImage src={photo} className={cx('share-popup__header__image')} />
      </div>
      <h4 className='font-weight-bold mt-5'>
        Share this with your social <br />
        Community
      </h4>
      <div className='d-flex flex-row align-items-center justify-content-center my-5'>
        <div className={cx('share-popup__fb-icon', 'mr-4')}>
          <FacebookShareButton
            url={url}
            title={title}
            about={title}
            hashtag='#finder'
            quote={title}
          >
            <FacebookSharingIcon />
          </FacebookShareButton>
        </div>
        <div className={cx('share-popup__twitter-icon')}>
          <TwitterShareButton url={url}>
            <TwitterIcon />
          </TwitterShareButton>
        </div>
      </div>
      <div className='text-left mx-4'>
        <div className={cx('share-popup__sharing-link-container__link')}>
          or copy link
        </div>
        <div className={cx('share-popup__sharing-link-container')}>
          <div className={cx('share-popup__sharing-link-container__link')}>
            {url}
          </div>
          <div
            className={cx('share-popup__sharing-link-container__copy')}
            onClick={() => copyTextToClipboard('Copied!', url)}
          >
            Copy
          </div>
        </div>
      </div>
    </Modal>
  );
};
