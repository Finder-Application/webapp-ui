import { User } from '@/hooks/auth/interface';
import React from 'react';

type Props = {
  owner?: User;
};
export const ContactInform = (
  props: React.HTMLProps<HTMLDivElement> & Props
) => {
  const { owner } = props;

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
      {renderInfoDetail('Living place', owner?.address || '')}
      {/* {renderInfoDetail('Office address', '254 Nguyen Van Linh')} */}
      {renderInfoDetail('Email', owner?.email || '')}
      {renderInfoDetail('Phone', owner?.phone || '')}
    </div>
  );
};
