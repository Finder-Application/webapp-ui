import { AsyncImage, ButtonFinder } from '@/components';
import { DropdownIcon } from '@/components/Icons';
import { FinderInput } from '@/components/Input';
import { Me } from '@/hooks/auth/interface';
import { useCreateNetworkImageUrl } from '@/hooks/networkImage/query';
import { useUpdateUserInformation } from '@/hooks/user/queries';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { UserUtils } from '@/utils/User.utils';
import { Avatar, Form, Select } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AVATAR_PLACEHOLDER, cn } from '../SettingsPage';
const { Option } = Select;

enum FormItemName {
  FirstName,
  MiddleName,
  LastName,
  Gender,
}

const ProfileForm = () => {
  const [form] = Form.useForm();
  const labelCol = {
    span: 24,
  };

  const [user, setUser] = useUserStore((user) => [user.user, user.setUser]);
  const gender = UserUtils.toStringGender(user?.gender);

  const updateUserMutation = useUpdateUserInformation();
  const netWorkImageUrl = useCreateNetworkImageUrl();

  const setIsShowingLoadingModal = useAppStore(
    (state) => state.setIsShowingLoadingModal
  );
  // Get the instance of the FileReader
  const reader = new FileReader();

  const [selectedAvatarImageFile, setSelectedAvatarImageFile] =
    useState<File>();

  const [selectedAvatarImage, setSelectedAvatarImage] = useState<
    string | ArrayBuffer | null | undefined
  >();

  const avatarInputFile = React.useRef<HTMLInputElement | null>(null);

  const onAvatarButtonClick = () => {
    // `current` points to the mounted file input element
    avatarInputFile?.current?.click();
  };

  const onChangeAvatarFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event?.target?.files?.item(0);
    console.log(file);

    reader.readAsDataURL(file as Blob);
    setSelectedAvatarImageFile(file!);

    // Once loaded, do something with the string
    reader.addEventListener('load', (event) => {
      setSelectedAvatarImage(event.target?.result);
    });
  };

  const getImageUrl = async () => {
    let avatarUrl: string = '';
    if (selectedAvatarImageFile) {
      const result = await netWorkImageUrl
        .mutateAsync([selectedAvatarImageFile])
        .then((value) => {
          return value.images;
        });
      avatarUrl = result[0];
    }

    return avatarUrl;
  };

  const onUpdateUserInformation = async () => {
    if (user) {
      try {
        const avatarUrl = await getImageUrl();

        const data = (await updateUserMutation.mutateAsync({
          body: {
            ...user,
            social: '',
            isActive: true,
            firstName: form.getFieldValue(FormItemName.FirstName),
            middleName: form.getFieldValue(FormItemName.MiddleName),
            lastName: form.getFieldValue(FormItemName.LastName),
            gender: UserUtils.toBooleanGender(
              form.getFieldValue(FormItemName.Gender)
            ),
            avatar: avatarUrl ? avatarUrl : user.avatar,
          },
        })) as unknown as Me;
        setUser(data);
        toast.success('Update successfully');
      } catch (error) {
        toast.error('Something went wrong');
      }
    }
  };

  const userAvatar = selectedAvatarImage
    ? (selectedAvatarImage as string)
    : user?.avatar
    ? user.avatar
    : AVATAR_PLACEHOLDER;

  return (
    <div className={cn('general')}>
      <div>
        <Avatar
          shape='circle'
          size='large'
          className={cn('avatar')}
          src={<AsyncImage preview src={userAvatar} />}
        />
        <ButtonFinder className={cn('btn')} onClick={onAvatarButtonClick}>
          <input
            type='file'
            id='file'
            ref={avatarInputFile}
            style={{ display: 'none' }}
            accept='image/*'
            onChange={onChangeAvatarFile}
          />
          Upload new picture
        </ButtonFinder>
      </div>
      <Form
        form={form}
        name='control-hooks'
        scrollToFirstError={{
          behavior: 'smooth',
        }}
        labelCol={labelCol}
      >
        <div className='d-flex flex-row mt-4'>
          <Form.Item
            initialValue={user?.firstName}
            name={FormItemName.FirstName}
            rules={[
              { required: true, message: 'Please enter your first name!' },
            ]}
            labelCol={{
              span: 24,
            }}
          >
            <FinderInput
              required
              label='First name'
              width='32em'
              className='mr-3'
            />
          </Form.Item>
          <Form.Item
            initialValue={user?.middleName}
            name={FormItemName.MiddleName}
            labelCol={{
              span: 24,
            }}
          >
            <FinderInput
              label='Middle name'
              type='text'
              width='32em'
              className='mr-3'
            />
          </Form.Item>
          <div className='d-flex flex-column'>
            <label className='d-flex flex-row'>
              Gender
              <div className='ml-1' style={{ color: 'red' }}>
                *
              </div>
            </label>
            <Form.Item
              name={FormItemName.Gender}
              rules={[{ required: true, message: 'Gender is required' }]}
              initialValue={gender}
            >
              <Select
                className={cn(
                  'create-post__creating-form__inform-input-container__select'
                )}
                value={gender}
                placeholder='Gender'
                style={{ width: 120 }}
                suffixIcon={
                  <DropdownIcon width={10} height={10} color='black' />
                }
              >
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item
          name={FormItemName.LastName}
          initialValue={user?.lastName}
          rules={[{ required: true, message: 'Please enter your last name!' }]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput required label='Last name' className='mt-3' />
        </Form.Item>
        <div className='d-flex flex-row justify-content-end mt-5'>
          <ButtonFinder
            htmlType='submit'
            className={cn('btn')}
            onClick={async () => {
              const isFormValid = await form.validateFields();
              if (isFormValid) {
                setIsShowingLoadingModal(true);
                await onUpdateUserInformation();
                setIsShowingLoadingModal(false);
              }
            }}
          >
            Save changes
          </ButtonFinder>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;
