import DocumentUtils from '@/utils/Document.utils';
import classNames from 'classnames/bind';
import React from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';
import styles from './CustomPage.module.scss';

const cx = classNames.bind(styles);
export const CustomPage = (props: RouteFinder) => {
  DocumentUtils.setTitle(props.title);
  const Page = props.page;
  return (
    <div className={cx('custom-page')}>
      <React.Suspense fallback={<LoadingPage />}>
        <Page />
      </React.Suspense>
    </div>
  );
};
