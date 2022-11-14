import { ButtonFinder } from '@/components';
import { ColoringGoogleIcon } from '@/components/Icons';
import { ROUTES } from '@/configs';
import { Form, Input } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
  useGoogleLogin,
} from 'react-google-login';
import styles from './RegisterPage.module.scss';
import { useRegisterMutation } from '@/hooks/auth/query';
import { RegisterDto } from '@/hooks/auth/interface';
const cx = classNames.bind(styles);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutate: register, isLoading } = useRegisterMutation({
    onSuccess: () => {
      navigate(ROUTES.home);
    },
  });

  const { signIn } = useGoogleLogin({
    scope: 'profile email',
    clientId:
      '894609161760-1btovlg15pcuoedtfanpkogtahetsdq7.apps.googleusercontent.com',
    onSuccess: (res) => {
      console.log(res);
    },
    onFailure: (res) => {
      console.log(res);
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = () => {};

  const onFinish = (values: RegisterDto) => {
    register({
      ...values,
    });
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
            <div className={cx('label')}>First name</div>
            <Form.Item
              name={'firstName'}
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
            <div className={cx('label')}>Last name</div>
            <Form.Item
              name={'lastName'}
              rules={[
                {
                  required: true,
                  message: `Phone number is required`,
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
          loading={isLoading}
        >
          Register
        </ButtonFinder>

        <div className='d-flex align-items-center my-3'>
          <hr className='my-0' style={{ width: '12rem' }} />
          <p className='mb-0'>or</p>
          <hr className='my-0' style={{ width: '12rem' }} />
        </div>

        {/* <GoogleLogin
          clientId='894609161760-1btovlg15pcuoedtfanpkogtahetsdq7.apps.googleusercontent.com'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          scope='profile'
          render={(renderProps) => ( */}
        <ButtonFinder className={cx('w-100', 'btn-google')} onClick={signIn}>
          <ColoringGoogleIcon className='mr-3' width={25} height={25} />
          Sign up with Google
        </ButtonFinder>
        {/* )}
        /> */}
      </div>
    </Form>
  );
};

export default RegisterPage;
