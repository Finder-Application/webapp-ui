import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

const FormSettingsProfile = () => {
  const [form] = Form.useForm();
  const labelCol = {
    span: 24,
  };
  return (
    <div>
      <Form
        form={form}
        name='control-hooks'
        scrollToFirstError={{
          behavior: 'smooth',
        }}
        labelCol={labelCol}
      >
        <Form.Item
          label='Live Place'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
          labelCol={{
            span: 24,
          }}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item
          label='Phone'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
          labelCol={{
            span: 24,
          }}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormSettingsProfile;
