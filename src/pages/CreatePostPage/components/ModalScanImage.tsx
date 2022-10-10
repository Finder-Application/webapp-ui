import { Modal } from 'antd';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalScanImage.module.scss';
import { AsyncImage } from '@/components';

const cx = classNames.bind(styles);
interface ModalScanImageProps {
  src: string;
  isScanning: boolean;
}
const ModalScanImage = ({ src, isScanning }: ModalScanImageProps) => {
  console.log('🚀 ~ file: ModalScanImage.tsx ~ line 14 ~ src', !!src);
  console.log(
    '🚀 ~ file: ModalScanImage.tsx ~ line 14 ~ isScanning',
    isScanning
  );

  const rerender = () => {
    console.log(
      '🚀 ~ file: ModalScanImage.tsx ~ line 23 ~ rerender ~ rerender'
    );
    return null;
  };
  return (
    <Modal
      open={!!src}
      footer={[]}
      maskClosable={false}
      closable={false}
      closeIcon
      className={cx('modal-scan')}
    >
      <div className={cx('modal-image')}>
        <AsyncImage src={src} />
        {rerender()}
        {isScanning && <div className={'scan'}></div>}
      </div>
    </Modal>
  );
};

export default ModalScanImage;
