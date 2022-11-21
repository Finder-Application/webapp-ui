import { Input } from '@/components/Input';
import { useUserStore } from '@/store/user';
import { formatUserName } from '@/utils/format.util';
import { Form } from 'antd';
import React from 'react';
import { CreatePostFormItemsName, cx } from './CreatePostPage';

export const ContactInformationForm = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className={cx('create-post__contact-form')}>
      <h4>Contact Information</h4>
      <div className={cx('create-post__note', 'mb-4')}>
        * The below information is your default contact, you can modify in your
        profile setting
      </div>
      <Form.Item
        initialValue={user?.address}
        name={CreatePostFormItemsName.CONTACT_LIVING_PLACE}
        rules={[]}
      >
        <Input width='100%' label='Living place' disabled={true} />
      </Form.Item>

      <Form.Item
        name={CreatePostFormItemsName.CONTACT_EMAIL}
        initialValue={formatUserName({
          user: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            middleName: user?.middleName || '',
          },
        })}
        rules={
          [
            // {
            //   pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
            //   message: `Email address is invalid`,
            // },
          ]
        }
      >
        <Input width='100%' label='Email' className='my-3' disabled={true} />
      </Form.Item>
      <Form.Item
        initialValue={user?.phone}
        name={CreatePostFormItemsName.CONTACT_PHONE}
        rules={[]}
      >
        <Input width='100%' label='Phone' disabled={true} />
      </Form.Item>
    </div>
  );
};
