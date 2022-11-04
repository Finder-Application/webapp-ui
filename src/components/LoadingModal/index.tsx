import { useAppStore } from '@/store/app';
import { Modal } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './LoadingModal.module.scss';

const cx = classNames.bind(styles);

export const LoadingModal = () => {
  const isShowingLoadingModal = useAppStore(
    (state) => state.isShowingLoadingModal
  );
  return (
    <>
      <Modal
        open={isShowingLoadingModal}
        footer={[]}
        maskClosable={false}
        closable={false}
        closeIcon
        centered
        className={cx('loading-modal')}
      >
        <div className={cx('container')}>
          <div className={cx('wrapper')}>
            <div className={cx('circle')}></div>
            <div className={cx('circle')}></div>
            <div className={cx('circle')}></div>
            <div className={cx('shadow')}></div>
            <div className={cx('shadow')}></div>
            <div className={cx('shadow')}></div>
            <span>Loading</span>
          </div>
        </div>
      </Modal>
    </>
  );
};
