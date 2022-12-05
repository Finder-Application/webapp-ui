import { DropdownIcon } from '@/components/Icons';
import { FinderInput } from '@/components/Input';
import { usePostStore } from '@/store/post';
import GeoUtils from '@/utils/Geo.utils';
import StringUtils from '@/utils/String.utils';
import { Form, Select } from 'antd';
import toLower from 'lodash/toLower';
import React from 'react';
import shallow from 'zustand/shallow';
import { CreatePostFormItemsName, cx } from './CreatePostPage';

const { Option } = Select;

export const MissingAddressInformationForm = () => {
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
    missingAddress = {
      district: '',
      province: '',
    },
  } = createPostFormData || {};

  return (
    <>
      <h4>Missing Address</h4>

      <div className={cx('create-post__creating-form__inform-input-container')}>
        <div className='d-flex flex-row align-items-center justify-content-start'>
          <div className='d-flex flex-column'>
            <label
              className={cx(
                'create-post__creating-form__inform-input-container__label'
              )}
            >
              Region
            </label>
            <Form.Item
              name={CreatePostFormItemsName.MISSING_REGION}
              initialValue={
                GeoUtils.getIDProvinceByName(
                  selectedPost?.missingAddress.region || ''
                ) || undefined
              }
              rules={[{ required: true, message: 'Region is required' }]}
            >
              <Select
                className={cx(
                  'create-post__creating-form__inform-input-container__select'
                )}
                value={missingAddress.province}
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
                    missingAddress: {
                      ...missingAddress,
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
              name={CreatePostFormItemsName.MISSING_STATE}
              initialValue={
                GeoUtils.getIDDistrictByName(
                  selectedPost?.missingAddress.state || ''
                ) || undefined
              }
              rules={[{ required: true, message: 'State is required' }]}
            >
              <Select
                className={cx(
                  'create-post__creating-form__inform-input-container__select'
                )}
                value={missingAddress.district}
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
                    missingAddress: {
                      ...missingAddress,
                      district,
                    },
                  });
                }}
                placeholder='State'
              >
                {GeoUtils.getAllDistricts(
                  missingAddress?.province
                    ? missingAddress?.province
                    : GeoUtils.getIDProvinceByName(
                        selectedPost?.missingAddress.region || ''
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
            name={CreatePostFormItemsName.MISSING_COMMUNE}
            initialValue={selectedPost?.missingAddress.commune}
          >
            <FinderInput width='90%' label='Commune/Precint' className='mr-4' />
          </Form.Item>
          <Form.Item
            name={CreatePostFormItemsName.MISSING_HAMLET}
            initialValue={selectedPost?.missingAddress.hamlet}
          >
            <FinderInput width='100%' label='Hamlet' />
          </Form.Item>
        </div>
      </div>
    </>
  );
};
