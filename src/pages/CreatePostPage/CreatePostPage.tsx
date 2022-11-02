import { ButtonFinder } from '@/components';
import { LoadingModal } from '@/components/LoadingModal';
import { useCreateNetworkImageUrl } from '@/hooks/networkImage/query';
import { useCreatePost } from '@/hooks/post';
import { FaceDescriptor } from '@/hooks/post/interface';
import { useAppStore } from '@/store/app';
import { usePostStore } from '@/store/post';
import GeoUtils from '@/utils/Geo.utils';
import { Form, Input as AntdInput } from 'antd';
import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  NICK_NAME = 'nickName',
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

  const [createPostFormData, setCreatePostFormData] = usePostStore((state) => [
    state.createPostFormData,
    state.setCreatePostFormData,
  ]);
  const setIsShowingLoadingModal = useAppStore(
    (state) => state.setIsShowingLoadingModal
  );

  const createPost = useCreatePost();
  const netWorkImageUrl = useCreateNetworkImageUrl();

  const [form] = Form.useForm();

  const onFormSubmit = useCallback(async () => {
    await form
      .validateFields()
      .then(async () => {
        if (createPostFormData.photos?.length === 0) {
          toast.error('Must have at least 1 image of this person to post!');
          return;
        }

        setIsShowingLoadingModal(true);
        const networkImageUrls = await netWorkImageUrl
          .mutateAsync(createPostFormData?.photos ?? [])
          .then((value) => {
            return value.images;
          });

        const descriptors: FaceDescriptor[] | undefined =
          createPostFormData?.descriptors?.map((descriptor, index) => {
            const url = networkImageUrls[index];
            const id = url.slice(networkImageUrls[index].indexOf('img-'));

            return {
              id: id,
              descriptor: descriptor,
            };
          });

        const getFormValue = (key: CreatePostFormItemsName) => {
          return form.getFieldValue(key);
        };
        await createPost
          .mutateAsync({
            dataCreate: {
              title: getFormValue(CreatePostFormItemsName.POST_TITLE),
              fullName: getFormValue(CreatePostFormItemsName.FULL_NAME),
              nickname: getFormValue(CreatePostFormItemsName.NICK_NAME),
              dateOfBirth: getFormValue(CreatePostFormItemsName.DOB),
              gender: getFormValue(CreatePostFormItemsName.GENDER) !== 'male',
              hometown: {
                region: GeoUtils.getProvince(
                  getFormValue(CreatePostFormItemsName.HOMETOWN_REGION)
                ),
                state: GeoUtils.getDistrict(
                  getFormValue(CreatePostFormItemsName.HOMETOWN_STATE)
                ),
                commune: getFormValue(CreatePostFormItemsName.HOMETOWN_COMMUNE),
                hamlet: getFormValue(CreatePostFormItemsName.HOMETOWN_HAMLET),
              },
              missingAddress: {
                region: GeoUtils.getProvince(
                  getFormValue(CreatePostFormItemsName.MISSING_REGION)
                ),
                state: GeoUtils.getDistrict(
                  getFormValue(CreatePostFormItemsName.MISSING_STATE)
                ),
                commune: getFormValue(CreatePostFormItemsName.MISSING_COMMUNE),
                hamlet: getFormValue(CreatePostFormItemsName.MISSING_HAMLET),
              },
              description: getFormValue(CreatePostFormItemsName.DESCRIPTION),
              missingTime: getFormValue(CreatePostFormItemsName.MISSING_TIME),
              photos: networkImageUrls,
              descriptors: descriptors ?? [],
            },
          })
          .then(() => {
            toast.success('Create Post successfully!');
          })
          .catch(() => {
            toast.error('Failed to create Post!');
          });

        form.resetFields();
        setCreatePostFormData({
          descriptors: [],
          photos: [],
        });
      })
      .catch((errors) => {
        // Errors in the fields
        console.log('errors: ', errors);
      });

    setIsShowingLoadingModal(false);
  }, [form, createPostFormData.photos, createPostFormData.descriptors]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <LoadingModal />

      <Form form={form} name='control-hooks' onFinish={onFinish}>
        <div className={cx('create-post')}>
          <div className={cx('create-post__creating-form')}>
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
                onClick={() => {
                  form.submit();
                  onFormSubmit();
                }}
              >
                {isFromPostDetail ? 'Save' : 'Create Post'}
              </ButtonFinder>
            </div>
          </div>
          <ContactInformationForm />
        </div>
      </Form>
    </>
  );
};

export default CreatePostPage;
