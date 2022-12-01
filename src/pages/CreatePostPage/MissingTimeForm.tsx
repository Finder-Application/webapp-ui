import { CalendarIcon2 } from '@/components/Icons';
import { constants } from '@/configs';
import { usePostStore } from '@/store/post';

import { DatePicker, Form, Select } from 'antd';
import moment from 'moment';
import React from 'react';
import { CreatePostFormItemsName, cx } from './CreatePostPage';

export const MissingTimeForm = () => {
  const selectedPost = usePostStore((state) => state.selectedPost);

  return (
    <>
      <h4>Missing Time</h4>

      <div className={cx('create-post__creating-form__inform-input-container')}>
        <div className='d-flex flex-column'>
          <label
            className={cx(
              'create-post__creating-form__inform-input-container__label'
            )}
          >
            Missing Time
          </label>
          <Form.Item
            name={CreatePostFormItemsName.MISSING_TIME}
            initialValue={
              selectedPost?.missingTime && moment(selectedPost?.missingTime)
            }
            rules={[
              {
                required: true,
                message: 'Missing time is required',
              },
            ]}
            hasFeedback
          >
            <DatePicker
              showTime={false}
              className={cx(
                'create-post__creating-form__inform-input-container__date-picker'
              )}
              style={{ width: '18em' }}
              placeholder={constants.formatDate}
              format={constants.formatDate}
              suffixIcon={<CalendarIcon2 height={15} width={15} />}
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
};
