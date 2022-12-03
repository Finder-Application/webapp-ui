import { TOOL_TIP_zINDEX } from '@/configs';
import { User } from '@/hooks/auth/interface';
import { useGetInfoUser } from '@/hooks/user/queries';
import { formatUserName } from '@/utils/format.util';
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/es/tooltip';
import React from 'react';
import { AsyncImage } from '../AsyncImage';
import { ContactInform } from '../PostList/components/PostDetail/ContactInform';
import './UserAvatar.scss';
type UserAvarProps = {
  userIconColor?: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
  user?: User;
  popup?: boolean;
};

export const UserAvatar = (props: UserAvarProps & TooltipProps) => {
  const {
    userIconColor = 'black',
    svgProps,
    user,
    className,
    popup = true,
    ...toolTopProps
  } = props;
  const { data } = useGetInfoUser(user?.userId, popup);
  return (
    <>
      <Tooltip
        placement='leftTop'
        title={
          popup && (
            <div className='mr-5'>
              <div className='d-flex flex-row mb-3 align-items-center'>
                {/* when done , remove it */}
                <AsyncImage
                  style={{ borderRadius: 50 }}
                  src={user?.avatar}
                  avatar
                  gender={user?.gender}
                />
                <div className='ml-2 font-weight-bold text-dark'>
                  {data && formatUserName({ user: data })}
                </div>
              </div>
              <ContactInform owner={data} className='text-dark' />
            </div>
          )
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
        <AsyncImage
          style={{ borderRadius: 50 }}
          src={user?.avatar}
          avatar
          gender={user?.gender}
          className={className}
        />
      </Tooltip>
    </>
  );
};
