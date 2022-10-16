import React from 'react';
import { TooltipProps } from 'antd/es/tooltip';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { Input as AntdInput, InputProps, InputRef } from 'antd';

const cx = classNames.bind(styles);

type MyInputProps = {
  label?: string;
  width?: number | string;
};

export const Input = (
  props: MyInputProps & InputProps & React.RefAttributes<InputRef>
) => {
  const { label, width, className, ...inputProps } = props;
  return (
    <div style={{ width: width }} className={className}>
      {label && <label className={cx('my-input__label')}>{label}</label>}
      <AntdInput {...inputProps} className={cx('my-input__input')} />
    </div>
  );
};
