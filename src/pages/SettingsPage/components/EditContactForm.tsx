import { ButtonFinder } from '@/components';
import { Input } from '@/components/Input';
import { useGetMe } from '@/hooks/auth/query';
import { useUpdateUserInformation } from '@/hooks/user/queries';
import { useAppStore } from '@/store/app';
import { Form, Select } from 'antd';
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
  const { data: me, refetch: refetchUserInform } = useGetMe();
  const updateUserMutation = useUpdateUserInformation();

  const setIsShowingLoadingModal = useAppStore(
    (state) => state.setIsShowingLoadingModal
  );

  const onUpdateUserContact = async () => {
    if (me) {
      await updateUserMutation
        .mutateAsync({
          body: {
            ...me,
            social: '',
            isActive: true,
            email: form.getFieldValue(FormItemName.Email),
            address: form.getFieldValue(FormItemName.Address),
            phone: form.getFieldValue(FormItemName.Phone),
          },
        })
        .then(() => {
          toast.success('Update successfully');
          refetchUserInform();
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
          initialValue={me?.email}
          name={FormItemName.Email}
          rules={[
            { required: true, message: 'Please enter your email!' },
            {
              pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
              message: `Please enter a valid email address`,
            },
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <Input type='email' required label='Email' className='mt-3' />
        </Form.Item>

        <Form.Item
          initialValue={me?.address}
          name={FormItemName.Address}
          rules={[{ required: true, message: 'Please enter your address!' }]}
          labelCol={{
            span: 24,
          }}
        >
          <Input required label='Address' className='mt-3' />
        </Form.Item>
        <Form.Item
          initialValue={me?.phone}
          name={FormItemName.Phone}
          rules={[
            { required: true, message: 'Please enter your phone!' },
            {
              pattern: new RegExp(
                /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
              ),
              message: `Please enter a valid phone`,
            },
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <Input required label='Phone' className='mt-3' type='phone' />
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
