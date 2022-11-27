import { ButtonFinder, PostList } from '@/components';
import { DatePicker, Select } from 'antd';
import Search from 'antd/lib/transfer/search';
import classNames from 'classnames/bind';
import { toLower } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import styles from './ReSearchPage.module.scss';
import GeoUtils from '@/utils/Geo.utils';
import StringUtils from '@/utils/String.utils';
import select from 'antd/lib/select';
const cx = classNames.bind(styles);
const ReSearch = () => {
  const [provinceState, setProvince] = useState('');
  const provinces = GeoUtils.getAllProvinces();
  const provincesFiltered = provinces.filter((province) =>
    toLower(StringUtils.cleanAccents(province.name)).includes(
      toLower(StringUtils.cleanAccents(provinceState))
    )
  );
  const { Option } = select;
  const [gender, setGender] = useState('');
  const onChange = () => {
    setGender(select.toString);
  };

  return (
    <div className={cx('research-page')}>
      <div className={cx('header')}>
        <h2 className={cx('title')}>
          30 related people according to your search
        </h2>
        <div className={cx('header__options')}>
          <div className={cx('header__options__search')}>
            <p>Name</p>
            <Search placeholder='Search....'></Search>
          </div>
          <div className={cx('header__options__birthdate')}>
            <p>Birth year</p>
            <DatePicker
              defaultValue={moment('25/09/2022', 'DD/MM/YYYY')}
              format={'DD/MM/YYYY'}
            />
          </div>
          <div className={cx('header__options__residence')}>
            <p>Residence</p>
            <Select
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
              {provinces.map((province, index) => (
                <Select.Option key={index} value={province.name}>
                  {province.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={cx('header__options__gender')}>
            <p>Geder</p>
            <Select
              style={{ color: '#403f3f', fontWeight: 'lighter' }}
              placeholder='Select gender'
              optionFilterProp='children'
              onChange={onChange}
            >
              <Option value='Male'>Male</Option>
              <Option value='Female'>Female</Option>
            </Select>
          </div>
          <ButtonFinder>Search</ButtonFinder>
        </div>
      </div>
      <div className={cx('d-flex justify-content-between')}>
        {/* <ButtonFinder
          icon={<RefreshIcon />}
          className={cx('btn-reset')}
          type='primary'
        >
          Reset Filter
        </ButtonFinder> */}
      </div>
      <div className={cx('mt-4')}>
        <PostList filter={{}} onSetTotalOfSearch={() => {}} />
      </div>
    </div>
  );
};
export default ReSearch;
