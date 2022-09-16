import { Skeleton } from 'antd';
import classNames from 'classnames/bind';
import omit from 'lodash/omit';
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
  const { src, className, avatar = false, imageLoading } = props;

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
    <img
      alt='image'
      {...omit({ ...props }, ['avatar', 'image-loading'])}
      className={cx(AsyncImageClassName)}
    />
  ) : (
    renderLoading()
  );
};
