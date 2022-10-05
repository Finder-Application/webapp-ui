import React from 'react';

export const MissingInform = (props: React.HTMLProps<HTMLDivElement>) => {
  const renderInfoDetail = (label: string, value: string) => {
    return (
      <div className='my-1'>
        <span className='font-weight-bold'>{label}: </span>
        <span>{value} </span>
      </div>
    );
  };

  return (
    <div {...props}>
      <h5 className='mb-4 font-weight-bold'>Missing person Information</h5>
      {renderInfoDetail('Fullname', 'Le Dinh Khoi')}
      {renderInfoDetail('Nickname', 'Win')}
      {renderInfoDetail('Dob', '30/08/2010')}
      {renderInfoDetail('Hometown', 'Da Nang')}
      {renderInfoDetail('Missing address', '74 Le Duan')}
      {renderInfoDetail('Missing time', ' 7h59 - 11/09/2022')}
    </div>
  );
};
