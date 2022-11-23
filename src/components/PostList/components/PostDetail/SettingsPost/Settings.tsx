import { ROUTES } from '@/configs';
import { Dropdown, MenuProps } from 'antd';
import { BsTrash } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';

import { useDeletePost } from '@/hooks/post';
import { usePostStore } from '@/store/post';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames;

interface SettingsPostProps {
  postId: number;
  onDelete?: () => void;
  onEdit?: () => void;
  setIsLoading?: () => void;
}
// TODO: FIX DELETED POST
export const SettingsPost = (
  props: SettingsPostProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) => {
  const { postId, children, onDelete, onEdit, setIsLoading } = props;

  const navigate = useNavigate();
  const deletePost = useDeletePost();
  const settingsDropdowns = [
    {
      title: 'Edit post',
      icon: FaRegEdit,
      onClick: () => {
        onEdit && onEdit();
        navigate(`${ROUTES.editPost}/${postId}`);
      },
    },
    {
      title: 'Delete post',
      icon: BsTrash,
      onClick: async () => {
        setIsLoading && setIsLoading();
        if (confirm('Are you sure you want to delete this post?') == true) {
          await deletePost.mutateAsync({ id: postId }).then(async () => {
            onDelete && onDelete();
          });
        }
      },
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
    <div {...props}>
      <Dropdown
        menu={{ items: menuDropdownItems }}
        placement='bottomLeft'
        arrow
      >
        {children}
      </Dropdown>
    </div>
  );
};
