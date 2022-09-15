import { AsyncImage } from '@/components';
import { constants } from '@/configs';
import { Skeleton } from 'antd';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);

interface PostProps {
  index: number;
}

export const PostLoading = (props: PostProps) => {
  const { index } = props;
  const timeDelay =
    (index === constants.POST_RENDER - 1 ? 0 : index + 0.1) * 0.25;

  const LoadingOwner = <Skeleton paragraph />;

  return (
    <div
      className={cx('post')}
      style={{
        animationDelay: `${timeDelay}s`,
      }}
    >
      <div className={cx('card', 'd-flex  justify-content-center')}>
        <div className={cx('card__image', 'col-6 h-100')}>
          <AsyncImage imageLoading />
        </div>
        <div className={cx('card__info', 'col-6 h-100')}>
          <div className='d-flex align-items-center  p-1 h-100 '>
            <Skeleton paragraph />
          </div>
        </div>
      </div>

      <div
        className={cx(
          'user',
          'd-flex justify-content-between align-items-center'
        )}
      >
        <div className={cx('user__info', 'd-flex align-items-center')}>
          <AsyncImage />
          Nguyen Van Nam
        </div>
        <div className={cx('created-at')}>{<Skeleton paragraph />}</div>
      </div>
    </div>
  );
};
