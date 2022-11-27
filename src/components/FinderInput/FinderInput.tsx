import { regex } from '@/configs';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input/Input';
import React from 'react';
interface FinderInputProps extends FormItemProps {
  type: 'email' | 'password' | 'name' | 'text' | 'number';
  isForm?: boolean;
}
const FinderInput = (props: FinderInputProps) => {
  const { type, required } = props;
  const getPattern = () => {
    switch (type) {
      case 'name':
        return new RegExp(regex.vietNamAlphabets);
      case 'email':
        return new RegExp(regex.email);
      default:
        break;
    }
  };

  return (
    <Form.Item
      {...props}
      rules={[
        {
          required: required,
          message: 'Your data must valid',
          pattern: getPattern(),
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default FinderInput;
