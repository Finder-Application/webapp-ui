import { ButtonFinder, PostList } from '@/components';
import { DropdownIcon } from '@/components/Icons';
import RefreshIcon from '@/components/Icons/RefreshIcon';
import GeoUtils from '@/utils/Geo.utils';
import StringUtils from '@/utils/String.utils';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import toLower from 'lodash/toLower';
import { useState } from 'react';
import styles from './Homepage.module.scss';
const { Option } = Select;

const cx = classNames.bind(styles);
const Homepage = () => {
  const [provinceState, setProvince] = useState<string>();
  const [genderFilter, setGenderFilter] = useState();
  const provinces = GeoUtils.getAllProvinces();

  console.log('genderFilter: ', genderFilter);
  return (
    <div className={cx('homepage')}>
      <div className={cx('title')}>
        We hope we can help you find your relatives as soon as possible
      </div>
      <div className={cx('d-flex justify-content-between')}>
        <div className={cx('search')}>
          <Select
            className={cx('select')}
            placeholder='Select region'
            showSearch
            onChange={(value) => {
              setProvince(value.trim());
            }}
            value={provinceState}
            onSearch={(value) => {
              setProvince(value.trim());
            }}
          >
            {provinces.map((province, index) => (
              <Select.Option key={index} value={province.name}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            value={genderFilter}
            placeholder='Gender'
            onChange={(value) => setGenderFilter(value)}
            style={{ width: 120 }}
            suffixIcon={<DropdownIcon width={10} height={10} />}
          >
            <Option value={false}>Male</Option>
            <Option value={true}>Female</Option>
          </Select>
          {/* <Select
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
            {provincesFiltered.map((province, index) => (
              <Select.Option key={index} value={province.name}>
                {province.name}
              </Select.Option>
            ))}
          </Select> */}
        </div>

        <ButtonFinder
          icon={<RefreshIcon />}
          className={cx('btn-reset')}
          type='primary'
          onClick={() => {
            setProvince(undefined);
            setGenderFilter(undefined);
          }}
        >
          Reset Filter
        </ButtonFinder>
      </div>

      <div className={cx('mt-4')}>
        <PostList filter={{ gender: genderFilter, region: provinceState }} />
      </div>
    </div>
  );
};
export default Homepage;
