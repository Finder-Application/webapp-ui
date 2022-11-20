import { ButtonFinder } from '@/components';
import { ROUTES } from '@/configs';
import { useLogin, useRegisterGoogleMutation } from '@/hooks/auth/query';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import StorageUtils from '@/utils/Storage.utils';
import styles from './LoginPage.module.scss';
import { ColoringGoogleIcon } from '@/components/Icons';
import { useGoogleLogin } from '@react-oauth/google';

const cx = classNames.bind(styles);
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  });
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const mutationLogin = useLogin({
    onSuccess(data, variables, context) {
      StorageUtils.set('token', data.token.accessToken);
      navigate(ROUTES.home);
    },
  });
  const updateFormState = (key: keyof typeof formState, value: string) => {
    setFormState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const { mutate: registerGG, isLoading: isLoadingGG } =
    useRegisterGoogleMutation({
      onSuccess: (data) => {
        console.log(data);
        StorageUtils.set('token', data.token.accessToken);
        navigate(ROUTES.home);
      },
    });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      registerGG({ idToken: tokenResponse.access_token });
    },
    scope: 'profile email openid',
    flow: 'implicit',
  });

  const handleSubmit = () => {
    mutationLogin.mutate(formState);
  };

  return (
    <div className={cx('login-page')}>
      <div className={cx('header', 'd-flex justify-content-between')}>
        <div className={cx('header-title')}>Welcome to Finder</div>
        <div className={cx('header-navigate')}>
          <span>Don't have account?</span>
          <br />
          <div
            className='d-flex flex-row justify-content-end'
            onClick={() => navigate(ROUTES.register)}
          >
            Sign up
          </div>
        </div>
      </div>

      <div className={cx('title')}>Login</div>

      <div className={cx('form-input')}>
        <div className={cx('label')}>
          Enter your username or email address:{' '}
        </div>
        <Input
          className={cx('input')}
          onChange={(e) => updateFormState('email', e.target.value)}
        />
      </div>
      <div className={cx('form-input')}>
        <div className={cx('label')}>Enter your Password: </div>
        <Input
          className={cx('input')}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => updateFormState('password', e.target.value)}
          suffix={
            showPassword ? (
              <AiOutlineEyeInvisible onClick={toggleShowPassword} />
            ) : (
              <AiOutlineEye onClick={toggleShowPassword} />
            )
          }
        />
      </div>

      <div
        className={cx('d-flex justify-content-end', 'forgot-password')}
        onClick={() => navigate(ROUTES.forgotPassword)}
      >
        Forgot Password
      </div>

      <ButtonFinder
        type='primary'
        className={cx('w-100', 'btn-login')}
        onClick={handleSubmit}
      >
        Login{' '}
      </ButtonFinder>

      <ButtonFinder
        className={cx('w-100', 'btn-google')}
        onClick={() => login()}
      >
        <ColoringGoogleIcon className='mr-3' width={25} height={25} />
        Sign up with Google
      </ButtonFinder>
    </div>
  );
};

export default LoginPage;
