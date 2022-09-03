import { ButtonFinder } from '@/components';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export const Homepage = () => {
  return (
    <div className={cx('wrapper')}>
      <ButtonFinder type='primary' />
    </div>
  );
};
