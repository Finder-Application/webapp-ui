import { useWindowScroll } from '@/hooks';
import DocumentUtils from '@/utils/Document.utils';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import styles from './CustomPage.module.scss';

const cx = classNames.bind(styles);
export const CustomPage = (props: RouteFinder) => {
  const { pageY } = useWindowScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  DocumentUtils.setTitle(props.title);
  const Page = props.page;
  return (
    <div className={cx('custom-page')}>
      <React.Suspense>
        <Page />
      </React.Suspense>
    </div>
  );
};
