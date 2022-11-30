import { ROUTES } from '@/configs';
import { Dropdown, MenuProps, Modal } from 'antd';
import { BsTrash } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';

import { useDeletePost } from '@/hooks/post';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RouteUtils } from '@/utils/Route.utils';
import { ViewDetailIcon } from '@/components/Icons';

const cx = classNames;

interface SettingsPostProps {
  postId: number;
  onDelete?: () => void;
  onEdit?: () => void;
  onViewDetail?: () => void;
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
  const { postId, children, onDelete, onEdit, onViewDetail, setIsLoading } =
    props;

  const navigate = useNavigate();
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    setIsLoading && setIsLoading();
    await deletePost.mutateAsync({ id: postId }).then(async () => {
      toast.success('You delete post successfully');
      onDelete && onDelete();
    });
  };
  const settingsDropdowns = [
    {
      title: 'Edit post',
      icon: FaRegEdit,
      onClick: () => {
        onEdit && onEdit();
        navigate(`${ROUTES.editPost}/${postId}`);
      },
      shouldShowItem: true,
    },
    {
      title: 'Delete post',
      icon: BsTrash,
      onClick: async () => {
        Modal.confirm({
          title: 'Are you sure you want to delete this post?',
          cancelText: 'Cancel',
          onOk: handleDelete,
        });
      },
      shouldShowItem: true,
    },

    {
      title: 'View detail',
      icon: ViewDetailIcon,
      onClick: () => {
        onViewDetail && onViewDetail();
        navigate(`${RouteUtils.getPath('postDetail')}/${postId}`);
      },
      shouldShowItem: onViewDetail ? true : false,
    },
  ];
  const menuDropdownItems: MenuProps['items'] = settingsDropdowns.map(
    (item, index) => {
      const Icon = item.icon;
      return item.shouldShowItem
        ? {
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
                <Icon
                  className={cx('header__user-dropdown__item__icon', 'mr-3')}
                />
                <span>{item.title}</span>
              </div>
            ),
          }
        : null;
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
