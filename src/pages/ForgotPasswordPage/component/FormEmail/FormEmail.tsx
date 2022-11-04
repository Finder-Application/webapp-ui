import { ButtonFinder } from "@/components/ButtonFinder/ButtonFinder";
import { Input } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from './FormEmail.module.scss';

const cx = classNames.bind(styles);
const FormEmail= ()=>{
    const [email, setEmail] = useState('');
    return (
    <div className={cx("form-email")}>
         <h2 className={cx('form-email__header')}>Confirm Your Email</h2>
        <div className={cx('form-email__content', 'col-12')}>
            <div className={cx('form-email__content--form-input')}>
                <label className='w-100'>Enter email address</label>
                <Input
                  className={cx('input')}
                    type='text'
                    placeholder='example@example'
                    onChange={(e) => {
                    setEmail(e.target.value);
                    }}
                />
            </div>
        </div>
        <div className={cx('form-email__footer', 'col-12')}>
        <div
          className={cx('form-email__footer-fg', 'text-right')}
        >
          Go to Sign In?
        </div>
        <ButtonFinder
        type='primary'
        className={cx('w-100', 'btn-login')}
        onSubmit={()=> true}
        >
          Send OTP
        </ButtonFinder>
      </div>
    </div>
    )
}
export default FormEmail;