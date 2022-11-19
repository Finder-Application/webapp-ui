import commonImages from '@/assets/images/common';
import { useUserStore } from '@/store/user';
import { Image as ImageAntd, ImageProps, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './AsyncImage.module.scss';

const cx = classNames.bind(styles);

interface AsyncImageProps {
  avatar?: boolean;
  imageLoading?: boolean;
  gender?: boolean;
  size?: 'small' | 'medium' | 'large';
}
type Props = ImageProps & AsyncImageProps;
export const AsyncImage = React.forwardRef((props: Props, ref) => {
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
  const {
    avatar = false,
    alt = 'image',
    imageLoading,
    size = 'small',
    preview = false,
    gender = 'female',
    ...imageProps
  } = props;
  const { src, className } = imageProps;
  const AsyncImageClassName = cx('async-image', className, `${avatar && size}`);

  React.useEffect(() => {
    setLoadedSrc(null);
    if (src) {
      const handleLoad = (): void => {
        setLoadedSrc(src);
      };
      const image = new Image();
      image.src = src;
      image.addEventListener('load', handleLoad);
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [src]);

  const renderLoading = () => {
    if (avatar) {
      return (
        <Skeleton
          className={AsyncImageClassName}
          avatar={true}
          active={true}
          title={false}
          paragraph={{ rows: 0 }}
        />
      );
    }
    return <Skeleton.Image className={AsyncImageClassName} active={true} />;
  };

  if (avatar && !loadedSrc && !imageLoading) {
    return (
      <ImageAntd
        preview={preview}
        alt={alt}
        className={cx(AsyncImageClassName)}
        {...imageProps}
        src={commonImages[gender ? 'male' : 'female']}
      />
    );
  }
  return loadedSrc === src && !imageLoading ? (
    <ImageAntd
      preview={preview}
      alt={alt}
      className={cx(AsyncImageClassName)}
      {...imageProps}
    />
  ) : (
    renderLoading()
  );
});
