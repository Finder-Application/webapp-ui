import { ButtonFinder } from '@/components';
import { FinderInput } from '@/components/Input';
import { Form } from 'antd';
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
          <FinderInput required label='Old password' className='mt-3' />
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
          ]}
          labelCol={{
            span: 24,
          }}
        >
          <FinderInput required label='Confirm password' className='mt-3' />
        </Form.Item>
        <div className='d-flex flex-row justify-content-end mt-5'>
          <ButtonFinder htmlType='submit' className={cn('btn')}>
            Change
          </ButtonFinder>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
