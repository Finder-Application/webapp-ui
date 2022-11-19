import { AsyncImage } from '@/components';
import { constants } from '@/configs';
import { Skeleton } from 'antd';
import classNames from 'classnames/bind';
import styles from './PostLoading.module.scss';

const cx = classNames.bind(styles);

interface PostProps {
  index: number;
}

export const PostLoading = (props: PostProps) => {
  const { index } = props;
  const timeDelay =
    (index === constants.RENDERED_POST_SIZE ? 0 : index + 0.1) * 0.35;

  return (
    <div
      className={cx('post-loading')}
      style={{
        animationDelay: `${timeDelay}s`,
      }}
    >
      <div className={cx('card', 'd-flex  justify-content-center')}>
        <div className={cx('w-50 h-100')}>
          <AsyncImage imageLoading className={cx('image-loading')} />
        </div>
        <div className={cx('card__info', 'col-7 h-100')}>
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
          <AsyncImage avatar className={cx('user__avatar')} />
          <Skeleton
            active
            loading
            style={{
              width: '10rem',
            }}
            title={false}
            paragraph={{
              rows: 1,
            }}
          />
        </div>
        <div className={cx('created-at d-flex flex-end')}>
          <Skeleton
            active
            loading
            style={{
              width: '10rem',
            }}
            paragraph={{
              rows: 1,
            }}
            title={false}
          />
        </div>
      </div>
    </div>
  );
};
