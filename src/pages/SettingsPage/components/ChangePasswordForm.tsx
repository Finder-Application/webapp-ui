import { ButtonFinder } from '@/components';
import { FinderInput } from '@/components/Input';
import { useChangePassword } from '@/hooks/auth/query';
import { useAppStore } from '@/store/app';
import { Form } from 'antd';
import { toast } from 'react-toastify';
import { cn } from '../SettingsPage';

enum FormItemName {
  OldPassword,
  NewPassword,
  ConfirmPassword,
}

const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const labelCol = {
    span: 24,
  };

  const setIsShowingLoadingModal = useAppStore(
    (state) => state.setIsShowingLoadingModal
  );

  const changePassword = useChangePassword();

  const onChangePassword = async () => {
    await changePassword
      .mutateAsync({
        password: form.getFieldValue(FormItemName.NewPassword),
        oldPassword: form.getFieldValue(FormItemName.OldPassword),
      })
      .then(() => {
        toast.success('Change password successfully');
        form.resetFields();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
          name={FormItemName.OldPassword}
          rules={[
            { required: true, message: 'Please enter your old password!' },
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput
            type='password'
            required
            label='Old password'
            className='mt-3'
          />
        </Form.Item>

        <Form.Item
          name={FormItemName.NewPassword}
          help='Minimum 6 characters'
          rules={[{ required: true, message: 'Please enter new password!' }]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput
            type='password'
            required
            label='New password'
            className='mt-3'
          />
        </Form.Item>
        <Form.Item
          name={FormItemName.ConfirmPassword}
          rules={[
            { required: true, message: 'Please enter password confirmation!' },
            ({ getFieldValue }) => ({
              validator: (_, value) => {
                const confirmedPassword = Number(value);
                const newPassword = Number(
                  getFieldValue(FormItemName.NewPassword)
                );

                if (confirmedPassword === newPassword) {
                  return Promise.resolve();
                } else {
                  return Promise.reject('Password does not match');
                }
              },
            }),
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput
            type='password'
            required
            label='Confirm password'
            className='mt-3'
          />
        </Form.Item>
        <div className='d-flex flex-row justify-content-end mt-5'>
          <ButtonFinder
            htmlType='submit'
            className={cn('btn')}
            onClick={async () => {
              const isFormValid = await form.validateFields();

              if (isFormValid) {
                setIsShowingLoadingModal(true);
                await onChangePassword();
                setIsShowingLoadingModal(false);
              }
            }}
          >
            Change
          </ButtonFinder>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
