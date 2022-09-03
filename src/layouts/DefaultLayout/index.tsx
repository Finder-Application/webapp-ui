import React from 'react';

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div>
      <h2>Header</h2>
      {children}
      <div>Footer</div>
    </div>
  );
};
