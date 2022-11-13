import { ButtonFinder } from '@/components/ButtonFinder/ButtonFinder';
import { ROUTES } from '@/configs';
import { useChangePwPublic } from '@/hooks/auth/query';
import StorageUtils from '@/utils/Storage.utils';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewPassword.module.scss';

const cx = classNames.bind(styles);

interface Props {
  onBack: () => void;
  email: string;
}
const NewPassword = ({ onBack, email }: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: changePassword } = useChangePwPublic({
    onSuccess(data, variables, context) {
      StorageUtils.set('token', data.token.accessToken);
      navigate(ROUTES.home);
    },
  });
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values);

        changePassword({
          email,
          password: values.password,
          otp: +values.otp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={cx('new-password')}>
      <Form name='basic' onFinish={onFinish} autoComplete='off' form={form}>
        <div className={cx('new-password__content', 'col-12')}>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <div className={cx('new-password__content--form-input')}>
              <label className='w-100'>Enter password</label>
              <Input className={cx('input')} type='password' />
            </div>
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            rules={[
              {
                required: true,
                message: 'Please input your new confirm password!',
              },
              {
                validator: (rule, value) => {
                  if (value !== form.getFieldValue('password')) {
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <div className={cx('new-password__content--form-input')}>
              <label className='w-100'>Enter confirm password</label>
              <Input className={cx('input')} type='password' />
            </div>
          </Form.Item>

          <Form.Item
            name='otp'
            rules={[
              { required: true, message: 'Please input your otp!' },
              {
                len: 6,
              },
            ]}
          >
            <div className={cx('new-password__content--form-input')}>
              <label className='w-100'>Enter OTP value</label>
              <Input className={cx('input')} placeholder='example: 567900' />
            </div>
          </Form.Item>
        </div>
        <div
          className={cx(
            'new-password__footer',
            'col-12',
            'd-flex',
            'flex-wrap'
          )}
        >
          <div className={cx('new-password__footer-fg', 'w-50')}></div>
          <div
            className={cx('new-password__footer-fg', 'w-50', 'text-right')}
            onClick={onBack}
          >
            Go Back?
          </div>
          <ButtonFinder
            htmlType='submit'
            type='primary'
            className={cx('w-100', 'btn-submit')}
          >
            Submit
          </ButtonFinder>
        </div>
      </Form>
    </div>
  );
};
export default NewPassword;
