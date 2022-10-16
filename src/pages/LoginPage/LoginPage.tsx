import { ButtonFinder } from '@/components';
import { ROUTES } from '@/configs';
import { useLoginApi } from '@/hooks/query/useLoginApi';
import { ValidateUtils } from '@/utils/Validate.utils';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './LoginPage.module.scss';
const cx = classNames.bind(styles);
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  });
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const mutationLogin = useLoginApi();
  const updateFormState = (key: keyof typeof formState, value: string) => {
    setFormState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  React.useEffect(() => {
    if (mutationLogin.isSuccess) {
      // navigate(ROUTES.home);
    }
    if (mutationLogin.isError) {
      toast.error('Please Login again');
    }
  }, [mutationLogin.isSuccess, mutationLogin.isError]);

  const handleSubmit = () => {
    mutationLogin.mutate(formState);
  };
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

      <div className={cx('d-flex justify-content-end', 'forgot-password')}>
        Forgot Password
      </div>

      <ButtonFinder
        type='primary'
        className={cx('w-100', 'btn-login')}
        onClick={handleSubmit}
      >
        Login{' '}
      </ButtonFinder>
    </div>
  );
};

export default LoginPage;
