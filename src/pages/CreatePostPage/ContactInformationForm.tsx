import { Input } from '@/components/Input';
import { Form } from 'antd';
import React from 'react';
import { CreatePostFormItemsName, cx } from './CreatePostPage';

export const ContactInformationForm = () => {
  return (
    <div className={cx('create-post__contact-form')}>
      <h4>Contact Information</h4>
      <div className={cx('create-post__note', 'mb-4')}>
        * The below information is your default contact, you can modify it if
        needed
      </div>
      <Form.Item
        name={CreatePostFormItemsName.CONTACT_LIVING_PLACE}
        rules={[
          {
            required: true,
            message: `Living place is required`,
          },
        ]}
      >
        <Input width='100%' label='Living place' />
      </Form.Item>
      <Form.Item
        name={CreatePostFormItemsName.CONTACT_OFFICE_ADDRESS}
        rules={[
          {
            required: true,
            message: `Office address is required`,
          },
        ]}
      >
        <Input width='100%' label='Office address' className='my-2' />
      </Form.Item>
      <Form.Item
        name={CreatePostFormItemsName.CONTACT_EMAIL}
        rules={[
          {
            required: true,
            message: `Email address is required`,
          },
          {
            pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
            message: `Email address is invalid`,
          },
        ]}
      >
        <Input width='100%' label='Email' className='mb-2' />
      </Form.Item>
      <Form.Item
        name={CreatePostFormItemsName.CONTACT_PHONE}
        rules={[
          {
            required: true,
            message: `Phone address is required`,
          },
          {
            pattern: new RegExp(
              /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
            ),
            message: `Phone is invalid`,
          },
        ]}
      >
        <Input width='100%' label='Phone' />
      </Form.Item>
    </div>
  );
};
