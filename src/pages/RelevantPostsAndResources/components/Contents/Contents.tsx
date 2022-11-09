import {
  RelevantResourcesMenuItems,
  useRelevantResourcesStore,
} from '@/store/relevantResources';
import React from 'react';
import { RelevantPosts } from './RelevantPosts';
import { RelevantResources } from './RelevantResources';
import styles from './Contents.module.scss';
import classNames from 'classnames/bind';

export const cx = classNames.bind(styles);

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Contents = (props: Props) => {
  const currentItem = useRelevantResourcesStore((state) => state.currentPage);
  return (
    <div {...props} className={cx('content', 'ml-5')}>
      {currentItem === RelevantResourcesMenuItems.RelevantPost ? (
        <RelevantPosts />
      ) : (
        <RelevantResources />
      )}
    </div>
  );
};
