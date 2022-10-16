import { ButtonFinder } from '@/components';
import { CloseIcon } from '@/components/Icons';
import { Form, Input as AntdInput } from 'antd';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { ContactInformationForm } from './ContactInformationForm';
import styles from './CreatePostPage.module.scss';
import { DescriptionForm } from './DescriptionForm';
import { FaceImageExample } from './FaceImageExample';
import { MissingAddressInformationForm } from './MissingAddressInformationForm';
import { MissingPersonInformationForm } from './MissingPersonInformationForm';
import { MissingTimeForm } from './MissingTimeForm';
import { UploadImagesForm } from './UploadImagesForm';
const { TextArea } = AntdInput;

type CreatePostLocationState = {
  isFromPostDetail: boolean;
};

export const cx = classNames.bind(styles);

export enum CreatePostFormItemsName {
  POST_TITLE = 'postTitle',
  FULL_NAME = 'fullName',
  GENDER = 'gender',
  DOB = 'dob',
  HOMETOWN_REGION = 'hometownRegion',
  HOMETOWN_STATE = 'hometownState',
  HOMETOWN_COMMUNE = 'hometownCommune',
  HOMETOWN_HAMLET = 'hometownHamlet',
  MISSING_REGION = 'missingRegion',
  MISSING_STATE = 'missingSTATE',
  MISSING_COMMUNE = 'missingCommune',
  MISSING_HAMLET = 'missingHamlet',
  MISSING_TIME = 'missingTime',
  DESCRIPTION = 'description',
  CONTACT_LIVING_PLACE = 'contactLivingPlace',
  CONTACT_OFFICE_ADDRESS = 'contactOfficeAddress',
  CONTACT_EMAIL = 'contactEmail',
  CONTACT_PHONE = 'contactPhone',
}

const CreatePostPage = () => {
  const location = useLocation();
  const state = location.state as CreatePostLocationState;
  const { isFromPostDetail = false } = state || {};

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form form={form} name='control-hooks' onFinish={onFinish}>
      <div className={cx('create-post')}>
        <div className={cx('create-post__creating-form')}>
          <ButtonFinder
            className={cx('create-post__creating-form__cancel-btn', 'mb-5')}
          >
            <CloseIcon
              fontWeight={800}
              width='13'
              height='13'
              className='mr-2'
            />
            Cancel
          </ButtonFinder>
          <Form.Item
            name={CreatePostFormItemsName.POST_TITLE}
            rules={[
              {
                required: true,
                message: `Title is required`,
              },
            ]}
          >
            <TextArea
              className={cx('create-post__creating-form__title-input')}
              bordered={false}
              placeholder='Title here...'
              size='large'
              allowClear
              autoSize
              maxLength={80}
            />
          </Form.Item>
          <div className='mb-5' />
          <MissingPersonInformationForm />
          <MissingAddressInformationForm />
          <MissingTimeForm />
          <DescriptionForm />
          <FaceImageExample />
          <UploadImagesForm />

          <div className='d-flex flex-row justify-content-end mt-5'>
            <ButtonFinder
              className={cx('create-post__creating-form__create-post-btn')}
              htmlType='submit'
            >
              {isFromPostDetail ? 'Save' : 'Create Post'}
            </ButtonFinder>
          </div>
        </div>
        <ContactInformationForm />
      </div>
    </Form>
  );
};

export default CreatePostPage;
