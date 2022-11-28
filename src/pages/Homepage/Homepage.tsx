import { ButtonFinder, PostList } from '@/components';
import { CalendarIcon2, ChevronDown, DropdownIcon } from '@/components/Icons';
import RefreshIcon from '@/components/Icons/RefreshIcon';
import PostDetail from '@/components/PostList/components/PostDetail/PostDetail';
import GeoUtils from '@/utils/Geo.utils';
import { DatePicker, Input, Select } from 'antd';
import classNames from 'classnames/bind';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import styles from './Homepage.module.scss';
import CommonImages from '@/assets/images/common';
import { SEARCH_QUERY } from '@/configs';

const { Option } = Select;

const cx = classNames.bind(styles);
const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_QUERY);

  const [provinceState, setProvince] = useState<string>();
  const [genderFilter, setGenderFilter] = useState();
  const [birthYearFilter, setBirthYearFilter] = useState<moment.Moment | null>(
    null
  );

  const filterOptions = useMemo(
    () => ({
      gender: genderFilter,
      residence: provinceState,
      birthYear: birthYearFilter,
    }),
    [genderFilter, provinceState, birthYearFilter]
  );

  const [totalOfSearch, setTotalOfSearch] = useState<number>();

  const provinces = GeoUtils.getAllProvinces();
  const [searchKeywords, setSearchKeywords] = useState(searchQuery);

  const isSearching =
    searchQuery ||
    provinceState !== undefined ||
    genderFilter !== undefined ||
    birthYearFilter !== null;

  const [showSearchForm, setShowSearchForm] = useState(isSearching);

  useEffect(() => {
    setSearchKeywords(searchQuery);
    setShowSearchForm(isSearching);
  }, [searchQuery]);

  const resetFilter = () => {
    setProvince(undefined);
    setGenderFilter(undefined);
    setBirthYearFilter(null);
  };

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
          {searchQuery && (
            <h3
              className={cx('homepage__search-container__form__search-result')}
            >
              {totalOfSearch} related people according to your search
            </h3>
          )}
          <div className='d-flex flex-row align-items-end justify-content-center'>
            <Input
              value={searchKeywords || ''}
              onChange={(e) => {
                const value = e.target.value;
                setSearchKeywords(value);
              }}
              placeholder='Search...'
              className={cx('homepage__search-container__form__input', 'mr-3')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (searchKeywords) {
                    setSearchParams(
                      createSearchParams({
                        [`${SEARCH_QUERY}`]: searchKeywords,
                      })
                    );
                  }
                }
              }}
            />
            <ButtonFinder
              className={cx(
                'homepage__search-container__form__search-btn',
                'mr-3'
              )}
              onClick={() => {
                if (searchKeywords) {
                  setSearchParams(
                    createSearchParams({ [`${SEARCH_QUERY}`]: searchKeywords })
                  );
                }
              }}
            >
              Search
            </ButtonFinder>
            <div className='mr-3'>
              <div className={cx('homepage__search-container__form__label')}>
                Birth year
              </div>
              <DatePicker
                value={birthYearFilter}
                className={cx('homepage__search-container__form__date-picker')}
                picker='year'
                suffixIcon={
                  <CalendarIcon2 height={15} width={15} color='#000' />
                }
                clearIcon={false}
                onChange={(value) => {
                  setBirthYearFilter(value);
                }}
              />
            </div>
            <div>
              <div className={cx('homepage__search-container__form__label')}>
                Residence
              </div>
              <Select
                className={cx(
                  'homepage__search-container__form__select',
                  'homepage__search-container__form__select__region'
                )}
                placeholder='Select residence'
                showSearch
                onChange={(value) => {
                  setProvince(value.trim());
                }}
                value={provinceState}
                onSearch={(value) => {
                  setProvince(value.trim());
                }}
                suffixIcon={<ChevronDown />}
              >
                {provinces.map((province, index) => (
                  <Select.Option key={index} value={province.name}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className='mx-3'>
              <div className={cx('homepage__search-container__form__label')}>
                Gender
              </div>
              <Select
                className={cx(
                  'homepage__search-container__form__select',
                  'homepage__search-container__form__select__gender'
                )}
                value={genderFilter}
                placeholder='Gender'
                onChange={(value) => setGenderFilter(value)}
                style={{ width: 120 }}
                suffixIcon={<ChevronDown />}
              >
                <Option value={false}>Male</Option>
                <Option value={true}>Female</Option>
              </Select>
            </div>

            <ButtonFinder
              className={cx('homepage__search-container__form__reset-btn')}
              onClick={resetFilter}
            >
              <RefreshIcon className='mr-2' />
              Reset Filter
            </ButtonFinder>
          </div>
        </div>
      </div>

      <div className={cx('mt-4')}>
        <PostList
          filter={filterOptions}
          onSetTotalOfSearch={(value) => setTotalOfSearch(value)}
        />
      </div>
      {searchParams.get('id') && (
        <PostDetail id={String(searchParams.get('id'))} />
      )}
    </div>
  );
};
export default Homepage;
