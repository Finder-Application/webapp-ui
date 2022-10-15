import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { CreatePostFormItemsName, cx } from './CreatePostPage';

export const DescriptionForm = () => {
  return (
    <>
      <h4>Description</h4>
      <div className={cx('create-post__note')}>
        * Please provide the specific information of the person you are looking
        for or found by you. The more specific, the more accurate and better
        matching
      </div>

      <div className={cx('create-post__creating-form__inform-input-container')}>
        <div className='d-flex flex-column'>
          <label
            className={cx(
              'create-post__creating-form__inform-input-container__label'
            )}
          >
            Description
          </label>
          <Form.Item
            name={CreatePostFormItemsName.DESCRIPTION}
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <TextArea
              className={cx(
                'create-post__creating-form__inform-input-container__text-area-input'
              )}
              style={{ height: 120, resize: 'none' }}
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
};
