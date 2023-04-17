import React, { ReactNode } from 'react';
import SideBarLeft from './SideBarLeft/SideBarLeft';
import TopFinder from './TopFinder/TopFinder';

const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className='d-flex justify-content-between'
      style={{
        gap: 10,
      }}
    >
      <SideBarLeft />
      <main>{children}</main>
      <TopFinder />
    </div>
  );
};

export default HomeLayout;
