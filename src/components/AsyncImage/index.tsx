import React from 'react';
import classNames from 'classnames/bind';
import styles from './AsyncImage.module.scss';
import { Skeleton } from 'antd';

const cx = classNames.bind(styles);
type AsyncImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
export const AsyncImage = (props: AsyncImageProps) => {
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
  const { src, className } = props;

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

  return loadedSrc === src ? (
    <img alt='image' {...props} className={cx(AsyncImageClassName)} />
  ) : (
    <Skeleton loading className={AsyncImageClassName} />
  );
};
