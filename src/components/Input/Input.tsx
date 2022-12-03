import React from 'react';
import { TooltipProps } from 'antd/es/tooltip';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { Input as AntdInput, InputProps, InputRef } from 'antd';

const cx = classNames.bind(styles);

type MyInputProps = {
  label?: string;
  width?: number | string;
  required?: boolean;
};

export const Input = (
  props: MyInputProps & InputProps & React.RefAttributes<InputRef>
) => {
  const { label, required = false, width, className, ...inputProps } = props;
  return (
    <div style={{ width: width }} className={className}>
      {label && (
        <label className={cx('my-input__label')}>
          {label}
          {required && (
            <div className='ml-1' style={{ color: 'red' }}>
              *
            </div>
          )}
        </label>
      )}
      <AntdInput className={cx('my-input__input')} {...inputProps} />
    </div>
  );
};
