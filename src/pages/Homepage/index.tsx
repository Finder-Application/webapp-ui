import { ButtonFinder } from '@/components';
import classNames from 'classnames/bind';
import styles from './Homepage.module.scss';

const cx = classNames.bind(styles);
const Homepage = () => {
  return (
    <div className={cx('wrapper')}>
      <ButtonFinder className={cx('wrapper__btn')} isBorder>
        Hello world
      </ButtonFinder>
    </div>
  );
};
export default Homepage;
