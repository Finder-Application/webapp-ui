import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import MessagesIcon from '@/components/Icons/MessagesIcon';
import classNames from 'classnames/bind';
import styles from './sideBarLeft.module.scss';
import { UserProfileIcon } from '@/components/Icons';
const cx = classNames.bind(styles);
const SideBarLeft = () => {
  const menuSidebarLeft = [
    {
      icon: <HomeIcon />,
      path: '/home',
      title: 'Home',
    },
    {
      icon: <MessagesIcon />,
      path: '/home',
      title: 'Home',
    },
    {
      icon: (
        <UserProfileIcon
          style={{
            height: 24,
            width: 24,
          }}
        />
      ),
      path: '/home',
      title: 'Home',
    },
  ];
  return (
    <div className={cx('sidebar-left')}>
      <div
        className='d-flex flex-column align-items-center'
        style={{
          gap: 30,
        }}
      >
        {menuSidebarLeft.map((item) => item.icon)}
      </div>
    </div>
  );
};

export default SideBarLeft;
