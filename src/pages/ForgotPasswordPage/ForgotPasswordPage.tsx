import classNames from 'classnames/bind';
import { useState } from 'react';
import FormEmail from './component/FormEmail/FormEmail';
import NewPassword from './component/NewPassword/NewPassword';
import styles from './ForgotPasswordPage.module.scss';
const cx = classNames.bind(styles);


const ForgotPasswordPage = ()=>{
    const [login, setLogin] = useState(false);
    
    
    return (
        <div className={cx('forgot-password')}>
            <div className={cx('forgot-password__header','d-flex-wrap')}>
                <div className='col-6'>
                    <div className={cx('forgot-password__header--welcome')}>
                        Welcome to <span>Finder</span>
                    </div>
                    <div className={cx('forgot-password__header--type')}>
                    
                    </div>
                </div>
                <div className='col-6'>
                    <div className={cx('forgot-password__header--sign-up','text-right')}>
                        Don't have an account?
                    </div>
                    <div
                        className={cx('forgot-password__header--sign-up-link','text-right')}
                        >
                        Sign up
                    </div>
                </div>
            </div>
           {/* <FormEmail /> */}
           <NewPassword/>
          
        </div>
    )
}
export default ForgotPasswordPage;