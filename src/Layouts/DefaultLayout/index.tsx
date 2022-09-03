import React from 'react';
import { DefaultLayoutProps } from '../types';

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div>
      HeaderLayout
      {children}
    </div>
  );
};
