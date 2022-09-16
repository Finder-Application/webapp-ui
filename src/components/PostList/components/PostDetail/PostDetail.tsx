import { useWindowSize } from '@/hooks';
import { Button, Drawer, Space } from 'antd';
import toNumber from 'lodash/toNumber';
import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss';

const cx = classNames.bind(styles);
interface PostDetailProps {
  isVisible?: boolean;
  onClose: () => void;
}
export const PostDetail = (props: PostDetailProps) => {
  const { isVisible, onClose } = props;

  const { height, width } = useWindowSize();

  return (
    <Drawer
      title='Velit laborum duis occaecat tur cillum elit magna nulla consequat. Non commodo fugiat nisi ex voluptate. '
      placement={'bottom'}
      width={width}
      open={isVisible}
      className={cx('post-detail')}
      height={toNumber(height) - 80}
      onClose={onClose}
      style={{
        borderRadius: 15,
      }}
      extra={
        <Space>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button type='primary' onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
