import React from 'react';

export const ContactInform = (props: React.HTMLProps<HTMLDivElement>) => {
  const renderInfoDetail = (label: string, value: string) => {
    return (
      <div className='my-2'>
        <span className='font-weight-bold'>{label}: </span>
        <span>{value} </span>
      </div>
    );
  };

  return (
    <div {...props}>
      {renderInfoDetail('Living place', ' K02/30 Son Tra')}
      {renderInfoDetail('Office address', '254 Nguyen Van Linh')}
      {renderInfoDetail('Email', 'finder@gmail.com')}
      {renderInfoDetail('Phone', '0342801091')}
    </div>
  );
};
