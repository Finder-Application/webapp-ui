import React from 'react';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonFinderProps {
  isBorder?: boolean;
}
export const ButtonFinder = React.forwardRef<
  HTMLButtonElement | null,
  ButtonProps & ButtonFinderProps
>((props, ref) => {
  const { className, isBorder } = props;
  const buttonFinderClassName = cx(
    'button-finder',
    {
      ['button-finder--border']: isBorder,
    },
    className
  );

  return (
    <Button ref={ref} className={buttonFinderClassName}>
      {props.children}
    </Button>
  );
});
