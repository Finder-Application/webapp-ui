import { ButtonFinder } from '@/components/ButtonFinder/ButtonFinder';
import { regex, ROUTES } from '@/configs';
import { useSendOtp } from '@/hooks/auth/query';
import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './FormEmail.module.scss';

const cx = classNames.bind(styles);

interface Props {
  onSendOtp: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}
const FormEmail = ({ onSendOtp, email, setEmail }: Props) => {
  const navigate = useNavigate();

  const { mutate, error, isLoading } = useSendOtp(email, {
    onSuccess(data, variables, context) {
      toast.success('Send otp success');
      onSendOtp();
    },
    onError(error, variables, context) {
      const data = error?.response?.data;
      if (error?.response?.data) {
        const { message } = data as any;
        if (typeof message === 'string') {
          toast.error(message);
        }
      }
    },
  });

  return (
    <div className={cx('form-email')}>
      <h2 className={cx('form-email__header')}>Confirm Your Email</h2>
      <div className={cx('form-email__content', 'col-12')}>
        <div className={cx('form-email__content--form-input')}>
          <label className='w-100'>Enter email address</label>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item
              name={'email'}
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  pattern: new RegExp(regex.email),
                  message: `Email address is invalid`,
                },
              ]}
            >
              <Input
                className={cx('input')}
                type='text'
                placeholder='example@example'
                typeof='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={cx('form-email__footer', 'col-12')}>
        <div
          className={cx('form-email__footer-fg', 'text-right')}
          onClick={() => navigate(ROUTES.login)}
        >
          Go to Sign In?
        </div>
        <ButtonFinder
          type='primary'
          className={cx('w-100', 'btn-login')}
          onClick={mutate}
          disabled={!email}
          loading={isLoading}
        >
          Send OTP
        </ButtonFinder>
      </div>
    </div>
  );
};
export default FormEmail;
