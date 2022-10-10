import React from 'react';
import classNames from 'classnames/bind';
import { usePostStore } from '@/store/post';
import shallow from 'zustand/shallow';
import { Modal } from 'antd';
import { AsyncImage } from '@/components/AsyncImage';
import { LARGE_IMAGES } from '../PostDetail';
import { FacebookSharingIcon, TwitterIcon } from '@/components/Icons';

import styles from './SharingPopup.module.scss';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

type SharingPopupProps = {};

export const SharingPopup = (
  props: SharingPopupProps & React.HTMLProps<HTMLDivElement>
) => {
  const [isShowSharingPopup, setIsShowSharingPopup] = usePostStore(
    (state) => [state.isShowSharingPopup, state.setIsShowSharingPopup],
    shallow
  );

  async function copyTextToClipboard(label: string, text: string) {
    toast.success(label);
    return await navigator.clipboard.writeText(text);
  }
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
        <AsyncImage
          src={LARGE_IMAGES[2].src}
          className={cx('share-popup__header__image')}
        />
      </div>
      <h4 className='font-weight-bold mt-5'>
        Share this with your social <br />
        Community
      </h4>
      <div className='d-flex flex-row align-items-center justify-content-center my-5'>
        <div className={cx('share-popup__fb-icon', 'mr-4')}>
          <FacebookSharingIcon />
        </div>
        <div className={cx('share-popup__twitter-icon')}>
          <TwitterIcon />
        </div>
      </div>
      <div className='text-left mx-4'>
        <div className={cx('share-popup__sharing-link-container__link')}>
          or copy link
        </div>
        <div className={cx('share-popup__sharing-link-container')}>
          <div className={cx('share-popup__sharing-link-container__link')}>
            https://finder.com/post/11310
          </div>
          <div
            className={cx('share-popup__sharing-link-container__copy')}
            onClick={() =>
              copyTextToClipboard('Copied!', 'https://finder.com/post/11310')
            }
          >
            Copy
          </div>
        </div>
      </div>
    </Modal>
  );
};
