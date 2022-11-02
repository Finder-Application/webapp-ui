import { Modal } from 'antd';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalScanImage.module.scss';
import { AsyncImage } from '@/components';

const cx = classNames.bind(styles);
interface ModalScanImageProps {
  images: string[];
  isScanning: boolean;
}
const ModalScanImage = ({ images, isScanning }: ModalScanImageProps) => {
  return (
    <Modal
      open={isScanning}
      footer={[]}
      maskClosable={false}
      closable={false}
      closeIcon
      centered
      className={cx('modal-scan')}
    >
      <div className='d-flex flex-row justify-content-center'>
        {images.map((src) => (
          <div className='d-flex flex-row align-items-center justify-content-center position-relative mr-3'>
            <div className={cx('image')}>
              <AsyncImage src={src} width={'14em'} height={'13em'} />
            </div>

            <div className={cx('scan')}></div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalScanImage;
