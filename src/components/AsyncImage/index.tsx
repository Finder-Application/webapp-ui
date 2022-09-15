import React from 'react';
import classNames from 'classnames/bind';
import styles from './AsyncImage.module.scss';
import { Skeleton } from 'antd';

const cx = classNames.bind(styles);

interface AsyncImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  avatar?: boolean;
  picture?: boolean;
  imageLoading?: boolean;
}

export const AsyncImage = (props: AsyncImageProps) => {
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
  const { src, className, avatar, imageLoading } = props;

  const AsyncImageClassName = cx('async-image', className);
  React.useEffect(() => {
    setLoadedSrc(null);
    if (src) {
      const handleLoad = (): void => {
        setLoadedSrc(src);
      };
      const image = new Image();
      image.src = src;
      image.onload = () => handleLoad();
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [src]);

  const renderLoading = () => {
    if (avatar) {
      return (
        <Skeleton className={AsyncImageClassName} avatar={avatar} active />
      );
    }
    return <Skeleton.Image className={AsyncImageClassName} active />;
  };
  return loadedSrc === src && !imageLoading ? (
    <img alt='image' {...props} className={cx(AsyncImageClassName)} />
  ) : (
    renderLoading()
  );
};
