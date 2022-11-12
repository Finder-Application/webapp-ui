import React, { useState } from 'react';
import Slider from 'react-slick';
import { NexArrowIcon, PrevArrowIcon } from '@/components/Icons';
import { AsyncImage } from '@/components/AsyncImage';

import classNames from 'classnames/bind';
import styles from './ImageSlider.module.scss';

const cx = classNames.bind(styles);

type ImageProps = {
  id: number;
  src: string;
  alt: string;
};

type ArrowProps = {
  onClick?: () => void;
};

const NextArrow = ({ onClick }: ArrowProps) => {
  return (
    <div className={cx('nextArrow')} onClick={onClick}>
      <NexArrowIcon />
    </div>
  );
};

const PrevArrow = ({ onClick }: ArrowProps) => {
  return (
    <div className={cx('prevArrow')} onClick={onClick}>
      <PrevArrowIcon />
    </div>
  );
};

type ImageSliderProps = {
  images: ImageProps[];
  slidesToShow?: number;
};

export const ImageSlider = ({ images, slidesToShow = 3 }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    className: cx('image-slider'),
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow:
      // slidesToShow - 0.1 => Ex: slidesToShow = 3 => slidesToShow - 0.1 = 2.99.
      // This is for fixing behavior bug for react-slick
      images.length >= slidesToShow ? slidesToShow - 0.1 : images.length,
    centerPadding: '0',
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => setImageIndex(next),
    customPaging: (i: number) => (
      <div
        className={cx(
          `carousel-dot`,
          `${i === imageIndex && 'carousel-dot--active'}`,
          `font-weight-bold`
        )}
      >
        •
      </div>
    ),
  };

  const templateImages = images.map((image, idx) => {
    if (image !== null) {
      const isActive = idx === imageIndex;
      return (
        <div className={cx(isActive ? 'activeSlide' : 'slide')} key={image?.id}>
          <div className='slideWrapper'>
            {isActive ? (
              <AsyncImage
                preview={true}
                src={image?.src}
                alt={image?.alt}
                className={cx('image')}
              />
            ) : (
              <AsyncImage
                className={cx('image')}
                src={image?.src}
                alt={image?.alt}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  });

  return <Slider {...settings}>{templateImages}</Slider>;
};
