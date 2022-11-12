import { Address, Post } from '@/hooks/post/interface';
import { formatDate } from '@/utils/format.util';
import moment from 'moment';
import React from 'react';

type MissingInformProps = {
  inform?: Post;
};
export const MissingInform = (
  props: React.HTMLProps<HTMLDivElement> & MissingInformProps
) => {
  const { inform } = props;

  const getAddress = (address?: Address) => {
    return (
      address?.region +
      ', ' +
      (address?.state ? address?.state + ', ' : '') +
      (address?.commune ? address?.commune + ', ' : '') +
      (address?.hamlet ? address?.hamlet : '')
    );
  };
  const homeTown = getAddress(inform?.hometown);

  const missingAddress = getAddress(inform?.missingAddress);

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
      {renderInfoDetail('Fullname', inform?.fullName || '')}
      {renderInfoDetail('Nickname', inform?.nickname || '')}
      {renderInfoDetail(
        'Dob',
        formatDate(new Date(inform?.dateOfBirth.toString() || ''), 'DD/MM/YYYY')
      )}
      {renderInfoDetail('Hometown', homeTown)}
      {renderInfoDetail('Missing address', missingAddress)}
      {/* // TODO: Missing Time currently is not returned from API. Need to update */}
      {inform?.missingTime &&
        renderInfoDetail(
          'Missing time',
          formatDate(new Date(inform?.missingTime.toString() || ''), 'LLLL')
        )}
    </div>
  );
};
