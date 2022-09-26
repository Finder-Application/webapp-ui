import { Skeleton } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './AsyncImage.module.scss';

const cx = classNames.bind(styles);

type ImagePropsDefault = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
interface AsyncImageProps {
  avatar?: boolean;
  imageLoading?: boolean;
}
type Props = ImagePropsDefault & AsyncImageProps;
export const AsyncImage = (props: Props) => {
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
  const { avatar = false, alt = 'image', imageLoading, ...imageProps } = props;
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
    <img alt={alt} {...imageProps} className={cx(AsyncImageClassName)} />
  ) : (
    renderLoading()
  );
};
