import React from 'react';
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/es/tooltip';
import { UserIcon } from '../Icons';

import './UserAvatar.scss';
import { ContactInform } from '../PostList/components/PostDetail/ContactInform';
import { TOOL_TIP_zINDEX } from '@/configs/settings';

type UserAvarProps = {
  userIconColor?: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
};

export const UserAvatar = (props: UserAvarProps & TooltipProps) => {
  const { userIconColor = 'black', svgProps, ...toolTopProps } = props;
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
      <UserIcon color={userIconColor} {...svgProps} />
    </Tooltip>
  );
};
