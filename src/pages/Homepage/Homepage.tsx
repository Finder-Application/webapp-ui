import { ButtonFinder, PostList } from '@/components';
import { DropdownIcon } from '@/components/Icons';
import RefreshIcon from '@/components/Icons/RefreshIcon';
import { PostDetail } from '@/components/PostList/components/PostDetail';
import { queryClient } from '@/main';
import GeoUtils from '@/utils/Geo.utils';
import { Input, Select } from 'antd';
import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import styles from './Homepage.module.scss';
import CommonImages from '@/assets/images/common';
import { useAppStore } from '@/store/app';
import shallow from 'zustand/shallow';

const { Option } = Select;

const cx = classNames.bind(styles);
const Homepage = () => {
  const searchParams = useSearchParams()[0];
  const [provinceState, setProvince] = useState<string>();
  const [genderFilter, setGenderFilter] = useState();

  const filterOptions = useMemo(
    () => ({ gender: genderFilter, region: provinceState }),
    [genderFilter, provinceState]
  );
  const provinces = GeoUtils.getAllProvinces();

  const [globalSearchingKeywords, setGlobalSearchingKeywords] = useAppStore(
    (state) => [
      state.globalSearchingKeyWords,
      state.setGlobalSearchingKeywords,
    ],
    shallow
  );

  const [searchKeywords, setSearchKeywords] = useState(globalSearchingKeywords);

  const [showSearchForm, setShowSearchForm] = useState(
    globalSearchingKeywords ? true : false
  );

  useEffect(() => {
    setSearchKeywords(globalSearchingKeywords);
    setShowSearchForm(globalSearchingKeywords ? true : false);
  }, [globalSearchingKeywords]);

  return (
    <div className={cx('homepage')}>
      <div className={cx('homepage__search-container')}>
        <img width='100%' src={CommonImages.banner} />
        <div className={cx('homepage__search-container__content')}>
          <h1 className={cx('homepage__search-container__content__title')}>
            WELCOME TO FINDER!
          </h1>
          <h3 className={cx('homepage__search-container__content__sub-title')}>
            We hope we can help you find your relatives as soon as possible
          </h3>

          <div
            className={cx('homepage__search-container__content__search-btn')}
          >
            <div
              className={cx(
                'homepage__search-container__content__search-btn__btn',
                showSearchForm &&
                  'homepage__search-container__content__search-btn__btn--hidden',
                'btn',
                'btn-white',
                'btn-animate'
              )}
              onClick={() => setShowSearchForm((state) => !state)}
            >
              SEARCH NOW
            </div>
          </div>
        </div>
        <div
          className={cx(
            'homepage__search-container__form',
            showSearchForm && 'homepage__search-container__form--visible'
          )}
        >
          <div className='d-flex flex-row align-items-center justify-content-center'>
            <Input
              value={searchKeywords}
              onChange={(e) => {
                const value = e.target.value;
                setSearchKeywords(value);
              }}
              placeholder='Search...'
              className={cx('homepage__search-container__form__input', 'mr-3')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setGlobalSearchingKeywords(searchKeywords);
                }
              }}
            />
            <ButtonFinder
              className={cx('homepage__search-container__form__search-btn')}
              onClick={() => {
                setGlobalSearchingKeywords(searchKeywords);
              }}
            >
              Search
            </ButtonFinder>
          </div>
        </div>
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
        <PostList filter={filterOptions} />
      </div>
      {searchParams.get('id') && (
        <PostDetail id={String(searchParams.get('id'))} />
      )}
    </div>
  );
};
export default Homepage;
