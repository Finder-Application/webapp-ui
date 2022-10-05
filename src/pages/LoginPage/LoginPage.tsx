import { AsyncImage, ButtonFinder } from '@/components';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { Input } from 'antd';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/configs';
const cx = classNames.bind(styles);
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={cx('login-page')}>
      <div className={cx('header', 'd-flex justify-content-between')}>
        <div className={cx('header-title')}>Welcome to Finder</div>
        <div className={cx('header-navigate')}>
          <span>Don't have account ?</span>
          <br />
          Sign up
        </div>
      </div>

      <div className={cx('title')}>Login</div>

      <div className={cx('form-input')}>
        <div className={cx('label')}>
          Enter your username or email address:{' '}
        </div>
        <Input className={cx('input')} />
      </div>
      <div className={cx('form-input')}>
        <div className={cx('label')}>Enter your Password: </div>
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
      </div>

      <div className={cx('d-flex justify-content-end', 'forgot-password')}>
        Forgot Password
      </div>

      <ButtonFinder
        type='primary'
        className={cx('w-100', 'btn-login')}
        onClick={() => navigate(ROUTES.home)}
      >
        Login{' '}
      </ButtonFinder>
    </div>
  );
};

export default LoginPage;
