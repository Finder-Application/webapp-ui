import React from 'react';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export const ButtonFinder = (props: ButtonProps) => {
  const { type } = props;
  const className = cx('button-finder', props.className, type);

  return (
    <Button {...props} className={className}>
      Button
    </Button>
  );
};
