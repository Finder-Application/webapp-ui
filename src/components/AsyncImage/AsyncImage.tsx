import { Image as ImageAntd, ImageProps, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './AsyncImage.module.scss';

const cx = classNames.bind(styles);

interface AsyncImageProps {
  avatar?: boolean;
  imageLoading?: boolean;
}
type Props = ImageProps & AsyncImageProps;
export const AsyncImage = React.forwardRef((props: Props, ref) => {
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
  const {
    avatar = false,
    alt = 'image',
    imageLoading,
    preview = false,
    ...imageProps
  } = props;
  const { src, className } = imageProps;
  const AsyncImageClassName = cx('async-image', className);

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
