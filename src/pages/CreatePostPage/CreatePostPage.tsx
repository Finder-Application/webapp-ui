import { ButtonFinder } from '@/components';
import { LoadingModal } from '@/components/LoadingModal';
import { useCreateNetworkImageUrl } from '@/hooks/networkImage/query';
import { useCreatePost, useGetPostDetail, useUpdatePost } from '@/hooks/post';
import { Descriptor, FaceDescriptor } from '@/hooks/post/interface';
import { useAppStore } from '@/store/app';
import { usePostStore } from '@/store/post';
import GeoUtils from '@/utils/Geo.utils';
import { Form, Input as AntdInput } from 'antd';
import classNames from 'classnames/bind';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

  const [createPostFormData, selectedPost, setSelectedPost] = usePostStore(
    (state) => [
      state.createPostFormData,
      state.selectedPost,
      state.setSelectedPost,
    ],
    shallow
  );

  const { data } = useGetPostDetail({ id: selectedPost?.id || -1 });

  const setIsShowingLoadingModal = useAppStore(
    (state) => state.setIsShowingLoadingModal
  );

  useEffect(() => {
    if (data) {
      setSelectedPost(data);
    }
    return () => setSelectedPost(undefined);
  }, [data]);

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const netWorkImageUrl = useCreateNetworkImageUrl();

  const [form] = Form.useForm();

  const onFormSubmit = useCallback(async () => {
    await form
      .validateFields()
      .then(async () => {
        const getFormValue = (key: CreatePostFormItemsName) => {
          return form.getFieldValue(key);
        };

        const payload = {
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
        };

        if (isFromPostDetail) {
          if (
            selectedPost?.photos.length === 0 &&
            createPostFormData.photos?.length === 0
          ) {
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
            createPostFormData?.descriptors?.reduce(
              (
                prev: { id: string; descriptor: Descriptor }[],
                descriptor,
                index
              ) => {
                const url: string = networkImageUrls[index];
                if (url) {
                  const id = url?.slice(
                    networkImageUrls[index].indexOf('img-')
                  );
                  return prev.concat({
                    id: id,
                    descriptor: descriptor,
                  });
                }
                return prev;
              },
              []
            );

          await updatePost
            .mutateAsync({
              id: selectedPost?.id.toString() || '',
              dataUpdate: {
                ...payload,
                photos: [...(selectedPost?.photos ?? []), ...networkImageUrls],
                descriptors: descriptors ?? [],
              },
            })
            .then(() => {
              toast.success('Update Post successfully!');
              // form.resetFields();
              // setCreatePostFormData({
              //   descriptors: [],
              //   photos: [],
              // });
            })
            .catch(() => {
              toast.error('Failed to create Post!');
            });

          return;
        }

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
          createPostFormData?.descriptors?.reduce(
            (
              prev: { id: string; descriptor: Descriptor }[],
              descriptor,
              index
            ) => {
              const url: string = networkImageUrls[index];
              if (url) {
                const id = url?.slice(networkImageUrls[index].indexOf('img-'));
                return prev.concat({
                  id: id,
                  descriptor: descriptor,
                });
              }
              return prev;
            },
            []
          );

        await createPost
          .mutateAsync({
            dataCreate: {
              ...payload,
              photos: networkImageUrls,
              descriptors: descriptors ?? [],
            },
          })
          .then(() => {
            toast.success('Create Post successfully!');
            // form.resetFields();
            // setCreatePostFormData({
            //   descriptors: [],
            //   photos: [],
            // });
          })
          .catch(() => {
            toast.error('Failed to create Post!');
          });
      })
      .catch((errors) => {
        // Errors in the fields
        console.log('errors: ', errors);
      });

    setIsShowingLoadingModal(false);
  }, [
    form,
    createPostFormData.photos,
    createPostFormData.descriptors,
    selectedPost,
  ]);

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
              initialValue={selectedPost?.title}
              rules={[
                {
                  required: true,
                  message: `Title is required`,
                },
              ]}
            >
              <TextArea
                defaultValue={selectedPost?.title}
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
