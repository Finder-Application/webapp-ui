import React from 'react';
import { TOOL_TIP_zINDEX } from '@/configs';
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/es/tooltip';
import { UserIcon } from '../Icons';
import { ContactInform } from '../PostList/components/PostDetail/ContactInform';

import './UserAvatar.scss';

type UserAvarProps = {
  userIconColor?: string;
};

export const UserAvatar = (props: UserAvarProps & TooltipProps) => {
  const { userIconColor = 'black', ...toolTopProps } = props;
  return (
    <Tooltip
      placement='leftTop'
      title={
        <div className='mr-5'>
          <div className='d-flex flex-row mb-3'>
            <UserIcon color={userIconColor} />
            <div className='ml-2 font-weight-bold text-dark'>Jamin le</div>
          </div>
          <ContactInform className='text-dark' />
        </div>
      }
      trigger='hover'
      zIndex={TOOL_TIP_zINDEX}
      overlayInnerStyle={{
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '1em 1em',
      }}
      overlayClassName={'user-avatar__overlay'}
      {...toolTopProps}
    >
      <UserIcon color={userIconColor} />
    </Tooltip>
  );
};
