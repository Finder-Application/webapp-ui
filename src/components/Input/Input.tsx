import React from 'react';
import { TooltipProps } from 'antd/es/tooltip';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { Input as AntdInput, InputProps, InputRef } from 'antd';

const cx = classNames.bind(styles);

type typeInput = 'password' | 'group' | 'text' | 'phone';
type MyInputProps = {
  label?: string;
  width?: number | string;
  required?: boolean;
  type?: typeInput;
};

export const FinderInput = (
  props: MyInputProps & InputProps & React.RefAttributes<InputRef>
) => {
  const {
    label,
    required = false,
    width,
    className,
    type = 'text',
    ...inputProps
  } = props;

  const Input = (() => {
    switch (type) {
      case 'password':
        return AntdInput.Password;
      case 'group':
        return AntdInput.Group;
      default:
        return AntdInput;
    }
  })();
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
      <Input className={cx('my-input__input')} {...(inputProps as any)} />
    </div>
  );
};
