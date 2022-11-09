import { ButtonFinder } from '@/components/ButtonFinder/ButtonFinder';
import { Button, Input } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './NewPassword.module.scss';

const cx = classNames.bind(styles);
const NewPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <div className={cx('new-password')}>
      <div className={cx('new-password__content', 'col-12')}>
        <div className={cx('new-password__content--form-input')}>
          <label className='w-100'>Enter password</label>
          <Input
            className={cx('input')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={cx('new-password__content--form-input')}>
          <label className='w-100'>Enter confirm password </label>
          <Input
            className={cx('input')}
            placeholder='Confirm Password'
            type='password'
          />
          <div className='text-danger'></div>
        </div>
        <div className={cx('new-password__content--form-input')}>
          <label className='w-100'>Enter OTP value</label>
          <Input className={cx('input')} placeholder='example: 567900' />
        </div>
      </div>
      <div
        className={cx('new-password__footer', 'col-12', 'd-flex', 'flex-wrap')}
      >
        <div className={cx('new-password__footer-fg', 'w-50')}></div>
        <div className={cx('new-password__footer-fg', 'w-50', 'text-right')}>
          Go Back?
        </div>
        <ButtonFinder type='primary' className={cx('w-100', 'btn-submit')}>
          Submit
        </ButtonFinder>
      </div>
    </div>
  );
};
export default NewPassword;
