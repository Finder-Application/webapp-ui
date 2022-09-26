import { useWindowSize } from '@/hooks';
import { Button, Divider, Drawer, Tooltip } from 'antd';
import toNumber from 'lodash/toNumber';
import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss';
import {
  CalendarIcon,
  CloseIcon,
  CommentIcon,
  ContactIcon,
  DocumentIcon,
  ShareIcon,
} from '@/components/Icons';
import Slider from 'react-slick';
import ImageSlider from './ImageSlider';
import { MissingInform } from './MissingInform';
import { ContactInform } from './ContactInform';
import { TOOL_TIP_zINDEX } from '@/configs/constants';
import { UserAvatar } from '@/components/UserAvatar';

const cx = classNames.bind(styles);
interface PostDetailProps {
  isVisible?: boolean;
  onClose: () => void;
}

export const LARGE_IMAGES = [
  {
    id: 1,
    src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    alt: 'Placeholder image',
  },
  {
    id: 3,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU',
    alt: 'Placeholder image',
  },
  {
    id: 1,
    src: 'https://media.istockphoto.com/photos/asian-poor-boy-with-happy-face-picture-id931087280?k=20&m=931087280&s=612x612&w=0&h=rp9eXInKksATBqxe4SrwZBP0s_bOJ-fIWlBF26H8Rz0=',
    alt: 'Placeholder image',
  },
  {
    id: 3,
    src: 'https://media.istockphoto.com/photos/group-of-vietnamese-girls-on-the-beach-vietnam-picture-id1268046898?k=20&m=1268046898&s=612x612&w=0&h=s70meFViTyW6S2G06zQ6h4RXAnb6U7Pymn0knmcsiZs=',
    alt: 'Placeholder image',
  },
];

const POP_TO_HEADER_HEIGHT = 50;

export const PostDetail = (props: PostDetailProps) => {
  const { isVisible, onClose } = props;

  const { height, width } = useWindowSize();

  return (
    <Drawer
      placement={'bottom'}
      width={width}
      open={isVisible}
      className={cx('post-detail')}
      height={toNumber(height) - POP_TO_HEADER_HEIGHT}
      onClose={onClose}
      headerStyle={{ display: 'none' }}
    >
      <CloseIcon onClick={onClose} className={cx('post-detail__close-icon')} />
      <div className={cx('post-detail__interaction-items')}>
        <UserAvatar />
        <Tooltip
          placement='leftTop'
          title='Comments'
          trigger='hover'
          zIndex={TOOL_TIP_zINDEX}
          overlayInnerStyle={{ padding: '0.5em 2em' }}
        >
          <Button
            className={cx('post-detail__interaction-items__item', 'my-4')}
          >
            <div
              className={cx(
                'post-detail__interaction-items__item__comments-count'
              )}
            >
              48
            </div>
            <CommentIcon width={15} height={15} />
          </Button>
        </Tooltip>
        <Tooltip
          placement='leftTop'
          title='Share'
          trigger='hover'
          zIndex={TOOL_TIP_zINDEX}
          overlayInnerStyle={{ padding: '0.5em 2em' }}
        >
          <Button className={cx('post-detail__interaction-items__item')}>
            <ShareIcon width={15} height={15} />
          </Button>
        </Tooltip>
      </div>
      <div className={cx('post-detail__main-content')}>
        <div className='col-9'>
          <h1>Lorem Ipsum is simply dummy text of the printing</h1>
          <hr />
          <div className='mt-4 mb-5 d-flex flex-row align-items-center'>
            <div className='d-flex flex-row'>
              <UserAvatar placement='bottomLeft' />
              <div className='ml-2 font-weight-bold'>Jamin le</div>
            </div>
            <Divider
              className='mx-3'
              style={{ backgroundColor: 'var(--grey-3)' }}
              type='vertical'
            />
            <div className='d-flex flex-row' style={{ color: 'var(--grey-4)' }}>
              <CalendarIcon className='mr-2' />
              <div>10/09/2022</div>
            </div>
          </div>
          <div className='d-flex flex-row justify-content-between'>
            <div style={{ width: '75%' }}>
              <ImageSlider images={LARGE_IMAGES} />
            </div>
            <MissingInform className='ml-3' />
          </div>

          <div className='mt-5 mb-4 d-flex flex-row align-items-center'>
            <DocumentIcon />
            <h5 className='m-0 ml-3'>Description</h5>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>

          <div className='mt-5 mb-4 d-flex flex-row align-items-center'>
            <ContactIcon />
            <h5 className='m-0 ml-3'>Contact Information</h5>
          </div>
          <ContactInform />
        </div>
      </div>
    </Drawer>
  );
};
