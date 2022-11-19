import { ButtonFinder } from '@/components/ButtonFinder';
import { ROUTES, TOOL_TIP_zINDEX } from '@/configs';
import { Dropdown, Menu, MenuProps, Tooltip } from 'antd';
import { cnPostDetail } from '../PostDetail';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';

import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames;

interface SettingsPostProps {
  postId: string;
}

export const SettingsPost = (props: SettingsPostProps) => {
  const navigate = useNavigate();
  const settingsDropdowns = [
    {
      title: 'Edit post',
      icon: FaRegEdit,
      onClick: () =>
        navigate(ROUTES.createPost, {
          state: {
            isFromPostDetail: true,
          },
        }),
    },
    {
      title: 'Delete post',
      icon: BsTrash,
      onClick: () => {},
    },
  ];
  const menuDropdownItems: MenuProps['items'] = settingsDropdowns.map(
    (item, index) => {
      const Icon = item.icon;
      return {
        key: index,
        label: (
          <div
            className={cx(
              'header__user-dropdown__item',
              index !== settingsDropdowns.length - 1 &&
                'header__user-dropdown__item__last-item'
            )}
            onClick={item.onClick}
          >
            <Icon className={cx('header__user-dropdown__item__icon', 'mr-3')} />
            <span>{item.title}</span>
          </div>
        ),
      };
    }
  );

  return (
    <div className='my-4'>
      <Dropdown
        menu={{ items: menuDropdownItems }}
        placement='bottomLeft'
        arrow
      >
        <ButtonFinder
          className={cnPostDetail('post-detail__interaction-items__item')}
        >
          <AiOutlineSetting width={15} height={15} />
        </ButtonFinder>
      </Dropdown>
    </div>
  );
};
