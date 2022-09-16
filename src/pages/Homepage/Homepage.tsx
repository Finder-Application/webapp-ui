import { constants } from '@/configs';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Homepage.module.scss';
import toLower from 'lodash/toLower';
import { cleanAccents } from '@/utils/cleanAccents';
import { ButtonFinder, PostList } from '@/components';
const cx = classNames.bind(styles);
const Homepage = () => {
  const [provinceState, setProvince] = useState('');

  const provincesFiltered = constants.PROVINCES.filter((province) =>
    toLower(cleanAccents(province.name)).includes(
      toLower(cleanAccents(provinceState))
    )
  );
  return (
    <div className={cx('homepage')}>
      <div className={cx('title')}>
        We hope we can help you find your relatives as soon as possible
      </div>
      <div className={cx('d-flex justify-content-between')}>
        <div className={cx('search')}>
          <Select
            className={cx('select')}
            defaultValue={provinceState}
            showSearch
            onChange={(value) => {
              setProvince(value.trim());
            }}
            value={provinceState}
            onSearch={(value) => {
              setProvince(value.trim());
            }}
          >
            <Select.Option value=''>Please choose province</Select.Option>
            {constants.PROVINCES.map((province, index) => (
              <Select.Option key={index} value={province.name}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            className={cx('select')}
            defaultValue={provinceState}
            showSearch
            onChange={(value) => {
              setProvince(value.trim());
            }}
            value={provinceState}
            onSearch={(value) => {
              setProvince(value.trim());
            }}
          >
            <Select.Option value=''>Please choose province</Select.Option>
            {constants.PROVINCES.map((province, index) => (
              <Select.Option key={index} value={province.name}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            className={cx('select ml-2')}
            defaultValue={provinceState}
            showSearch
            onChange={(value) => {
              setProvince(value.trim());
            }}
            value={provinceState}
            onSearch={(value) => {
              setProvince(value.trim());
            }}
          >
            <Select.Option value=''>Please choose province</Select.Option>
            {constants.PROVINCES.map((province, index) => (
              <Select.Option key={index} value={province.name}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className={cx('btn-reset')}>
          <ButtonFinder type='primary'>Reset</ButtonFinder>
        </div>
      </div>

      <div className={cx('mt-4')}>
        <PostList />
      </div>
    </div>
  );
};
export default Homepage;
