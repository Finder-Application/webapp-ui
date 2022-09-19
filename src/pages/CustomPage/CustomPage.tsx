import { setDocumentTitle } from '@/utils';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CustomPage.module.scss';
import { useWindowScroll, useWindowSize } from '@/hooks';

const cx = classNames.bind(styles);
export const CustomPage = (props: RouteFinder) => {
  const { pageY } = useWindowScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  setDocumentTitle(props.title);
  const Page = props.page;
  return (
    <div className={cx('custom-page')}>
      <Page />
      <button
        className={cx('scrollToTopBtn')}
        style={{
          top: Number(pageY) - 50,
        }}
      >
        ☝️
      </button>
    </div>
  );
};
