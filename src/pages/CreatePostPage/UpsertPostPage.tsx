import { ButtonFinder } from '@/components';
import { LoadingModal } from '@/components/LoadingModal';
import { ROUTES } from '@/configs';
import { useCreateNetworkImageUrl } from '@/hooks/networkImage/query';
import {
  CreatePostBody,
  useCreatePost,
  useGetPostDetail,
  useUpdatePost,
} from '@/hooks/post';
import { Descriptor } from '@/hooks/post/interface';
import { useAppStore } from '@/store/app';
import { usePostStore } from '@/store/post';
import GeoUtils from '@/utils/Geo.utils';
import { Form, Input as AntdInput } from 'antd';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import shallow from 'zustand/shallow';
import { ContactInformationForm } from './ContactInformationForm';
import styles from './CreatePostPage.module.scss';
import { DescriptionForm } from './DescriptionForm';
import { FaceImageExample } from './FaceImageExample';
import { MissingAddressInformationForm } from './MissingAddressInformationForm';
import { MissingPersonInformationForm } from './MissingPersonInformationForm';
import { MissingTimeForm } from './MissingTimeForm';
import { UploadImagesForm } from './UploadImagesForm';
const { TextArea } = AntdInput;

export const cx = classNames.bind(styles);

export enum EFormItemsName {
  POST_TITLE = 'title',
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

const UpsertPostPage = () => {
  const { id } = useParams<{ id: string }>() || { id: -1 };
  const { data, isSuccess, isLoading } = useGetPostDetail(Number(id));
  const navigate = useNavigate();
  const [createPostFormData, setSelectedPost, selectedPost] = usePostStore(
    (state) => [
      state.createPostFormData,
      state.setSelectedPost,
      state.selectedPost,
    ],
    shallow
  );

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const netWorkImageUrl = useCreateNetworkImageUrl();

  const [form] = Form.useForm<EFormItemsName>();

  useEffect(() => {
    if (isSuccess && data) {
      setSelectedPost(data);
    }
    if (!id) {
      setSelectedPost(undefined);
    }
  }, [isSuccess, id]);

  const setIsShowingLoadingModal = useAppStore(
    (state) => state.setIsShowingLoadingModal
  );

  const getFormValue = (key: keyof typeof EFormItemsName) => {
    return form.getFieldValue(EFormItemsName[key]);
  };

  const getRequestPayloadInfo = () => {
    return {
      title: getFormValue('POST_TITLE'),
      fullName: getFormValue('FULL_NAME'),
      nickname: getFormValue('NICK_NAME'),
      dateOfBirth: getFormValue('DOB'),
      gender: getFormValue('GENDER') !== 'male',
      hometown: {
        region: GeoUtils.getProvince(getFormValue('HOMETOWN_REGION')),
        state: GeoUtils.getDistrict(getFormValue('HOMETOWN_STATE')),
        commune: getFormValue('HOMETOWN_COMMUNE'),
        hamlet: getFormValue('HOMETOWN_HAMLET'),
      },
      missingAddress: {
        region: GeoUtils.getProvince(getFormValue('MISSING_REGION')),
        state: GeoUtils.getDistrict(getFormValue('MISSING_STATE')),
        commune: getFormValue('MISSING_COMMUNE'),
        hamlet: getFormValue('MISSING_HAMLET'),
      },
      description: getFormValue('DESCRIPTION'),
      missingTime: getFormValue('MISSING_TIME'),
    };
  };

  const hasFormValid = async () => {
    try {
      await form.validateFields();
      if (!selectedPost?.photos.length && !createPostFormData.photos?.length) {
        toast.error('Must have at least 1 image of this person to post!');
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const getImageUrls = async () => {
    if (createPostFormData) {
      const { photos } = createPostFormData;
      if (photos && photos.length > 0) {
        return netWorkImageUrl.mutateAsync(photos).then((value) => {
          return value.images;
        });
      }
    }

    return [];
  };

  const getPayloadDescriptors = (networkImageUrls: string[]) => {
    return createPostFormData?.descriptors?.reduce(
      (prev: { id: string; descriptor: Descriptor }[], descriptor, index) => {
        const url: string = networkImageUrls[index];
        if (url) {
          const id = url?.split('img-')[1];
          const nextValue = {
            id: id,
            descriptor: descriptor,
          };
          return [...prev, nextValue];
        }
        return prev;
      },
      []
    );
  };

  const handleCreatePost = async (post: CreatePostBody) => {
    await createPost.mutateAsync({
      dataCreate: post,
    });
  };

  const handleUpdatePost = async (id: string, post: CreatePostBody) => {
    return await updatePost.mutateAsync({
      dataUpdate: post,
      id,
    });
  };
  const onFormSubmit = useCallback(async () => {
    const isFormValid = await hasFormValid();
    if (isFormValid) {
      setIsShowingLoadingModal(true);
      try {
        const networkImageUrls = await getImageUrls();
        const descriptors = getPayloadDescriptors(networkImageUrls);
        const body = {
          ...getRequestPayloadInfo(),
          photos: [...(selectedPost?.photos ?? []), ...networkImageUrls],
          descriptors: descriptors ?? [],
        };

        const payload = {
          id: id,
          ...body,
        };
        if (!payload.id) {
          await handleCreatePost(payload);
        } else {
          await handleUpdatePost(payload.id, payload);
        }
        navigate(ROUTES.home);
      } catch (error) {
        console.log('error', error);
      }
      setIsShowingLoadingModal(false);
    }
  }, [form, selectedPost?.photos, createPostFormData?.descriptors, id]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  // TODO: Refactor
  return (
    <>
      <LoadingModal />
      {!id || (!isLoading && selectedPost) ? (
        <Form
          form={form}
          name='control-hooks'
          onFinish={onFinish}
          scrollToFirstError={{
            behavior: 'smooth',
          }}
        >
          <div className={cx('create-post')}>
            <div className={cx('create-post__creating-form')}>
              <Form.Item
                name={EFormItemsName.POST_TITLE}
                initialValue={selectedPost?.title}
                rules={[
                  {
                    required: true,
                    message: `Title is required`,
                  },
                ]}
              >
                <TextArea
                  value={selectedPost?.title}
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
              <UploadImagesForm isUpdatingPost={!!id} />

              <div className='d-flex flex-row justify-content-end mt-5'>
                <ButtonFinder
                  className={cx('create-post__creating-form__create-post-btn')}
                  htmlType='submit'
                  onClick={() => {
                    form.submit();
                    onFormSubmit();
                  }}
                >
                  {id ? 'Save' : 'Create Post'}
                </ButtonFinder>
              </div>
            </div>
            <ContactInformationForm />
          </div>
        </Form>
      ) : (
        <LoadingModal />
      )}
    </>
  );
};

export default UpsertPostPage;
