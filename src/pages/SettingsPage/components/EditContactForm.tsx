import { ButtonFinder } from '@/components';
import { FinderInput } from '@/components/Input';
import { regex } from '@/configs';
import { useUpdateUserInformation } from '@/hooks/user/queries';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { Form } from 'antd';
import { toast } from 'react-toastify';
import { cn } from '../SettingsPage';

enum FormItemName {
  Email,
  Address,
  Phone,
}

const EditContactForm = () => {
  const [form] = Form.useForm();
  const labelCol = {
    span: 24,
  };
  const user = useUserStore((user) => user.user);
  const updateUserMutation = useUpdateUserInformation();

  const setIsShowingLoadingModal = useAppStore(
    (state) => state.setIsShowingLoadingModal
  );

  const onUpdateUserContact = async () => {
    if (user) {
      await updateUserMutation
        .mutateAsync({
          body: {
            ...user,
            social: '',
            isActive: true,
            email: form.getFieldValue(FormItemName.Email),
            address: form.getFieldValue(FormItemName.Address),
            phone: form.getFieldValue(FormItemName.Phone),
          },
        })
        .then(() => {
          toast.success('Update successfully');
        })
        .catch((err) => toast.error(err));
    }
  };
  return (
    <div className={cn('general')}>
      <Form
        form={form}
        name='control-hooks'
        scrollToFirstError={{
          behavior: 'smooth',
        }}
        labelCol={labelCol}
      >
        <Form.Item
          initialValue={user?.email}
          name={FormItemName.Email}
          rules={[
            { required: true, message: 'Please enter your email!' },
            {
              pattern: regex.email,
              message: `Please enter a valid email address`,
            },
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput required label='Email' className='mt-3' />
        </Form.Item>

        <Form.Item
          initialValue={user?.address}
          name={FormItemName.Address}
          rules={[{ required: true, message: 'Please enter your address!' }]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput required label='Address' className='mt-3' />
        </Form.Item>
        <Form.Item
          initialValue={user?.phone}
          name={FormItemName.Phone}
          rules={[
            { required: true, message: 'Please enter your phone!' },
            {
              pattern: regex.phone,
              message: `Please enter a valid phone`,
            },
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput required label='Phone' className='mt-3' type='phone' />
        </Form.Item>
        <div className='d-flex flex-row justify-content-end mt-5'>
          <ButtonFinder
            htmlType='submit'
            className={cn('btn')}
            onClick={async () => {
              const isFormValid = await form.validateFields();

              if (isFormValid) {
                setIsShowingLoadingModal(true);
                await onUpdateUserContact();
                setIsShowingLoadingModal(false);
              }
            }}
          >
            Save Contact
          </ButtonFinder>
        </div>
      </Form>
    </div>
  );
};

export default EditContactForm;
