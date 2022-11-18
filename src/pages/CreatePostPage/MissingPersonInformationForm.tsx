import React from 'react';
import { CalendarIcon2, DropdownIcon } from '@/components/Icons';
import { Input } from '@/components/Input';
import { usePostStore } from '@/store/post';
import GeoUtils from '@/utils/Geo.utils';
import StringUtils from '@/utils/String.utils';
import { DatePicker, Form, Select } from 'antd';
import toLower from 'lodash/toLower';
import shallow from 'zustand/shallow';
import { CreatePostFormItemsName, cx } from './CreatePostPage';
import moment from 'moment';
import { regex } from '@/configs';

const { Option } = Select;

export const MissingPersonInformationForm = () => {
  const [createPostFormData, setCreatePostFormData, selectedPost] =
    usePostStore(
      (state) => [
        state.createPostFormData,
        state.setCreatePostFormData,
        state.selectedPost,
      ],
      shallow
    );

  const {
    hometownAddress = {
      district: '',
      province: '',
    },
  } = createPostFormData || {};

  return (
    <>
      <h4>Missing Person Information</h4>
      <div className={cx('create-post__creating-form__inform-input-container')}>
        <div
          className={cx(
            'create-post__creating-form__inform-input-container__title'
          )}
        >
          Information
        </div>
        <hr />
        <div className='d-flex flex-row align-items-start'>
          <div className='d-flex flex-row align-items-center mb-3'>
            <Form.Item
              name={CreatePostFormItemsName.FULL_NAME}
              initialValue={selectedPost?.fullName}
              rules={[
                {
                  required: true,
                  message: `Full name is required`,
                },
                {
                  pattern: new RegExp(regex.vietNamAlphabets),
                  message: `Full name must be alphabets`,
                },
              ]}
            >
              <Input
                width='18em'
                label='Full name'
                name={CreatePostFormItemsName.FULL_NAME}
              />
            </Form.Item>

            <div className='d-flex flex-column mx-4'>
              <label
                className={cx(
                  'create-post__creating-form__inform-input-container__label'
                )}
              >
                Gender
              </label>
              <Form.Item
                name={CreatePostFormItemsName.GENDER}
                initialValue={
                  selectedPost?.gender === undefined
                    ? undefined
                    : selectedPost?.gender === 0
                    ? 'male'
                    : 'female'
                }
                rules={[{ required: true, message: 'Gender is required' }]}
              >
                <Select
                  className={cx(
                    'create-post__creating-form__inform-input-container__select'
                  )}
                  placeholder='Gender'
                  style={{ width: 120 }}
                  suffixIcon={<DropdownIcon width={10} height={10} />}
                >
                  <Option value='male'>Male</Option>
                  <Option value='female'>Female</Option>
                </Select>
              </Form.Item>
            </div>

            <div className='d-flex flex-column'>
              <label
                className={cx(
                  'create-post__creating-form__inform-input-container__label'
                )}
              >
                Date of birth
              </label>
              <Form.Item
                name={CreatePostFormItemsName.DOB}
                initialValue={
                  selectedPost?.dateOfBirth && moment(selectedPost?.dateOfBirth)
                }
                rules={[
                  {
                    required: true,
                    message: 'Date of birth is required',
                  },
                ]}
              >
                <DatePicker
                  className={cx(
                    'create-post__creating-form__inform-input-container__date-picker'
                  )}
                  placeholder='MM/DD/YYYY'
                  format='MM-DD-YYYY'
                  suffixIcon={<CalendarIcon2 height={15} width={15} />}
                  clearIcon={false}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <Form.Item
          name={CreatePostFormItemsName.NICK_NAME}
          initialValue={selectedPost?.nickname}
        >
          <Input
            width='18em'
            label='Nick name (optional)'
            name={CreatePostFormItemsName.NICK_NAME}
          />
        </Form.Item>
      </div>
      <div className={cx('create-post__creating-form__inform-input-container')}>
        <div
          className={cx(
            'create-post__creating-form__inform-input-container__title'
          )}
        >
          Home town
        </div>
        <hr />
        <div className='d-flex flex-row align-items-center'>
          <div className='d-flex flex-column'>
            <label
              className={cx(
                'create-post__creating-form__inform-input-container__label'
              )}
            >
              Region
            </label>
            <Form.Item
              name={CreatePostFormItemsName.HOMETOWN_REGION}
              rules={[{ required: true, message: 'Region is required' }]}
              initialValue={
                GeoUtils.getIDProvinceByName(
                  selectedPost?.hometown.region || ''
                ) || undefined
              }
            >
              <Select
                className={cx(
                  'create-post__creating-form__inform-input-container__select'
                )}
                value={hometownAddress?.province}
                showSearch
                style={{ width: 180, paddingLeft: '0' }}
                suffixIcon={<DropdownIcon width={10} height={10} />}
                filterOption={(input, option: any) => {
                  return StringUtils.cleanAccents(
                    toLower(option?.children)
                  ).includes(StringUtils.cleanAccents(toLower(input)));
                }}
                onChange={(province) => {
                  setCreatePostFormData({
                    hometownAddress: {
                      ...hometownAddress,
                      province,
                      district: '',
                    },
                  });
                }}
                placeholder='Region'
              >
                {GeoUtils.getAllProvinces().map((province) => (
                  <Option value={province.idProvince} key={province.idProvince}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='d-flex flex-column mx-4'>
            <label
              className={cx(
                'create-post__creating-form__inform-input-container__label'
              )}
            >
              State
            </label>
            <Form.Item
              name={CreatePostFormItemsName.HOMETOWN_STATE}
              rules={[{ required: true, message: 'State is required' }]}
              initialValue={
                GeoUtils.getIDDistrictByName(
                  selectedPost?.hometown.state || ''
                ) || undefined
              }
            >
              <Select
                className={cx(
                  'create-post__creating-form__inform-input-container__select'
                )}
                value={hometownAddress?.district}
                style={{ width: 150 }}
                suffixIcon={<DropdownIcon width={10} height={10} />}
                showSearch
                filterOption={(input, option: any) => {
                  return StringUtils.cleanAccents(
                    toLower(option?.children)
                  ).includes(StringUtils.cleanAccents(toLower(input)));
                }}
                onChange={(district) => {
                  setCreatePostFormData({
                    hometownAddress: {
                      ...hometownAddress,
                      district,
                    },
                  });
                }}
                placeholder='State'
              >
                {GeoUtils.getAllDistricts(
                  hometownAddress?.province
                    ? hometownAddress?.province
                    : GeoUtils.getIDProvinceByName(
                        selectedPost?.hometown.region || ''
                      ) ?? ''
                ).map((district) => (
                  <Option value={district.idDistrict} key={district.idDistrict}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            name={CreatePostFormItemsName.HOMETOWN_COMMUNE}
            initialValue={selectedPost?.hometown.commune}
            rules={[
              {
                required: true,
                message: `Commune is required`,
              },
            ]}
          >
            <Input width='90%' label='Commune/Precint' className='mr-4' />
          </Form.Item>
          <Form.Item
            name={CreatePostFormItemsName.HOMETOWN_HAMLET}
            initialValue={selectedPost?.hometown.hamlet}
            rules={[
              {
                required: true,
                message: `Hamlet name is required`,
              },
            ]}
          >
            <Input width='100%' label='Hamlet' />
          </Form.Item>
        </div>
      </div>
    </>
  );
};
