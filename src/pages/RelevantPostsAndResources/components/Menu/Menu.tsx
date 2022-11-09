import { DocumentIcon, EarthIcon, PostIcon } from '@/components/Icons';
import { useRelevantResourcesStore } from '@/store/relevantResources';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';

import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

export enum RelevantResourcesMenuItems {
  RelevantPost = 'Relevant Posts',
  RelevantResources = 'Relevant Resources',
}

export const RelevantResourcesMenu = () => {
  const [currentItem, setCurrentItem] = useRelevantResourcesStore(
    (state) => [state.currentPage, state.setCurrentPage],
    shallow
  );

  const MenuItem = (props: {
    icon: React.ReactNode;
    menuItem: RelevantResourcesMenuItems;
  }) => {
    const { icon, menuItem } = props;

    const isActive = menuItem === currentItem;
    return (
      <div
        onClick={() => setCurrentItem(menuItem)}
        className={cx(
          'menu__item',
          isActive && 'menu__item--active',
          'd-flex flex-row align-items-center justify-content-start'
        )}
      >
        {icon}
        <div className='ml-3'>{menuItem}</div>
      </div>
    );
  };
  return (
    <div className={cx('menu')}>
      <MenuItem
        icon={<PostIcon width={20} height={20} />}
        menuItem={RelevantResourcesMenuItems.RelevantPost}
      />
      <MenuItem
        icon={<EarthIcon width={20} height={20} />}
        menuItem={RelevantResourcesMenuItems.RelevantResources}
      />
    </div>
  );
};
