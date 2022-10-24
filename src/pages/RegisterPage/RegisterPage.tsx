import { ButtonFinder } from '@/components';
import { ColoringGoogleIcon } from '@/components/Icons';
import { ROUTES } from '@/configs';
import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.scss';
const cx = classNames.bind(styles);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = () => {};

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form form={form} name='control-hooks' onFinish={onFinish}>
      <div className={cx('register-page')}>
        <div className={cx('header', 'd-flex justify-content-between')}>
          <div className={cx('header-title')}>Welcome to Finder</div>
          <div className={cx('header-navigate')}>
            <span>Already have an account?</span>
            <br />
            <div
              className='d-flex flex-row justify-content-end'
              onClick={() => navigate(ROUTES.login)}
            >
              Log in
            </div>
          </div>
        </div>

        <div className={cx('title')}>Register</div>

        <div className={cx('form-input')}>
          <div className={cx('label')}>Enter your email address</div>
          <Form.Item
            name={'email'}
            rules={[
              {
                required: true,
                message: `Email address is required`,
              },
              {
                pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                message: `Email address is invalid`,
              },
            ]}
          >
            <Input className={cx('input')} />
          </Form.Item>
        </div>
        <div
          className={cx(
            'form-input',
            'd-flex flex-row justify-content-between'
          )}
        >
          <div className='w-50'>
            <div className={cx('label')}>Username</div>
            <Form.Item
              name={'username'}
              rules={[
                {
                  required: true,
                  message: `Username is required`,
                },
              ]}
            >
              <Input className={cx('input')} />
            </Form.Item>
          </div>
          <div>
            <div className={cx('label')}>Contact phone number </div>
            <Form.Item
              name={'contact'}
              rules={[
                {
                  required: true,
                  message: `Phone number is required`,
                },
                {
                  pattern: new RegExp(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                  ),
                  message: `Phone number is invalid`,
                },
              ]}
            >
              <Input className={cx('input')} />
            </Form.Item>
          </div>
        </div>
        <div className={cx('form-input')}>
          <div className={cx('label')}>Enter your password </div>
          <Form.Item
            name={'password'}
            rules={[
              {
                required: true,
                message: `Password is required`,
              },
            ]}
          >
            <Input
              className={cx('input')}
              type={showPassword ? 'text' : 'password'}
              suffix={
                showPassword ? (
                  <AiOutlineEyeInvisible onClick={toggleShowPassword} />
                ) : (
                  <AiOutlineEye onClick={toggleShowPassword} />
                )
              }
            />
          </Form.Item>
        </div>

        <ButtonFinder
          type='primary'
          htmlType='submit'
          className={cx('w-100', 'btn-register')}
          onClick={handleSubmit}
        >
          Register
        </ButtonFinder>

        <div className='d-flex align-items-center my-3'>
          <hr className='my-0' style={{ width: '12rem' }} />
          <p className='mb-0'>or</p>
          <hr className='my-0' style={{ width: '12rem' }} />
        </div>
        <ButtonFinder className={cx('w-100', 'btn-google')}>
          <ColoringGoogleIcon className='mr-3' width={25} height={25} />
          Sign up with Google
        </ButtonFinder>
      </div>
    </Form>
  );
};

export default RegisterPage;
