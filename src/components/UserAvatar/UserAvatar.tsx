import React from 'react';
import { TOOL_TIP_zINDEX } from '@/configs';
import { Avatar, Tooltip } from 'antd';
import { TooltipProps } from 'antd/es/tooltip';
import { UserIcon } from '../Icons';

import './UserAvatar.scss';
import { ContactInform } from '../PostList/components/PostDetail/ContactInform';
import { User } from '@/hooks/auth/interface';
import { formatUserName } from '@/utils/format.util';

type UserAvarProps = {
  userIconColor?: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
  user?: User;
};

export const UserAvatar = (props: UserAvarProps & TooltipProps) => {
  const { userIconColor = 'black', svgProps, user, ...toolTopProps } = props;
  return (
    <Tooltip
      placement='leftTop'
      title={
        <div className='mr-5'>
          <div className='d-flex flex-row mb-3'>
            {/* when done , remove it */}
            {user ? (
              <Avatar src={user.avatar} size={'small'} />
            ) : (
              <UserIcon color={userIconColor} />
            )}

            <div className='ml-2 font-weight-bold text-dark'>
              {user ? formatUserName({ user }) : 'Jamin le'}
            </div>
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
      {user ? (
        <Avatar src={user.avatar} size={'small'} />
      ) : (
        <UserIcon color={userIconColor} {...svgProps} />
      )}
    </Tooltip>
  );
};
