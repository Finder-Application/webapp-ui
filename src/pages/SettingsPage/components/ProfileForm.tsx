import { AsyncImage, ButtonFinder } from '@/components';
import { DropdownIcon, UserIcon } from '@/components/Icons';
import { Input } from '@/components/Input';
import { useGetMe } from '@/hooks/auth/query';
import { useCreateNetworkImageUrl } from '@/hooks/networkImage/query';
import { useUpdateUserInformation } from '@/hooks/user/queries';
import { useAppStore } from '@/store/app';
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
  const { data: me, refetch: refetchUserInform } = useGetMe();

  const gender = !me ? undefined : me?.gender ? 'female' : 'male';

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
    if (me) {
      const avatarUrl = await getImageUrl();

      await updateUserMutation
        .mutateAsync({
          body: {
            ...me,
            social: '',
            isActive: true,
            firstName: form.getFieldValue(FormItemName.FirstName),
            middleName: form.getFieldValue(FormItemName.MiddleName),
            lastName: form.getFieldValue(FormItemName.LastName),
            gender:
              form.getFieldValue(FormItemName.Gender) === 'male' ? false : true,
            avatar: avatarUrl ? avatarUrl : me.avatar,
          },
        })
        .then(() => {
          toast.success('Update successfully');
          refetchUserInform();
        })
        .catch((err) => toast.error(err));
    }
  };

  const userAvatar = selectedAvatarImage
    ? (selectedAvatarImage as string)
    : me?.avatar
    ? me.avatar
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
            initialValue={me?.firstName}
            name={FormItemName.FirstName}
            rules={[
              { required: true, message: 'Please enter your first name!' },
            ]}
            labelCol={{
              span: 24,
            }}
          >
            <Input required label='First name' width='32em' className='mr-3' />
          </Form.Item>
          <Form.Item
            initialValue={me?.middleName}
            name={FormItemName.MiddleName}
            labelCol={{
              span: 24,
            }}
          >
            <Input
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
          initialValue={me?.lastName}
          rules={[{ required: true, message: 'Please enter your last name!' }]}
          labelCol={{
            span: 24,
          }}
        >
          <Input required label='Last name' className='mt-3' />
        </Form.Item>
        <div className='d-flex flex-row justify-content-end mt-5'>
          <ButtonFinder
            htmlType='submit'
            className={cn('btn')}
            onClick={async () => {
              setIsShowingLoadingModal(true);
              await onUpdateUserInformation();
              setIsShowingLoadingModal(false);
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
