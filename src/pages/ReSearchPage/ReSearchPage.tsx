import { ButtonFinder, Post, PostList } from "@/components";
import { DatePicker, Select } from "antd";
import Search from "antd/lib/transfer/search";
import classNames from "classnames/bind";
import { constants } from '@/configs';
import moment from "moment";
import { useState } from "react";
import styles from "./ResearchPage.module.scss";
import { toLower } from "lodash";
import RefreshIcon from "@/components/Icons/RefreshIcon";
import GeoUtils from "@/utils/Geo.utils";
import StringUtils from "@/utils/String.utils";
import select from "antd/lib/select";
const cx = classNames.bind(styles);
const ReSearch = ()=>{
    const [provinceState, setProvince] = useState('');
    const provinces = GeoUtils.getAllProvinces();
    const provincesFiltered = provinces.filter((province) =>
        toLower(StringUtils.cleanAccents(province.name)).includes(
        toLower(StringUtils.cleanAccents(provinceState))
        )
    );
    const { Option } = select;
    const [gender, setGender] = useState("");
    const onChange = ()=>{
      setGender(select.toString);
    }

    return(
    <div className={cx("ResearchPage")}>
        <div className= {cx("header")}>
            <h2 className={cx("title")}>30 related people according to your search</h2>
            <div className= {cx('optionSearch')}>
                <div className={cx('option')}>
                    <p>Name</p>
                    <Search placeholder="Search...." ></Search>
                </div>
                <div className={cx('option')}>
                    <p>Birth year</p>
                    <DatePicker defaultValue={moment('25/09/2022', 'DD/MM/YYYY')} format={'DD/MM/YYYY'}/>
                </div>
                <div className={cx('option')}>
                    <p>Residence</p>
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
                    {provinces.map((province, index) => (
                    <Select.Option key={index} value={province.name}>
                        {province.name}
                    </Select.Option>
                    ))}
                 </Select>
                </div>
                <div className={cx('option')}>
                    <p>Geder</p>
                    <Select

                        placeholder="Select gender"
                        optionFilterProp="children"
                        onChange={onChange}
                        
                    >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
        
                    </Select>
                </div>
                <ButtonFinder>Search</ButtonFinder>
            </div>
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
                {provinces.map((province, index) => (
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
                {provinces.map((province, index) => (
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
                {provinces.map((province, index) => (
                <Select.Option key={index} value={province.name}>
                    {province.name}
                </Select.Option>
                ))}
            </Select>
            </div>

            <ButtonFinder
            icon={<RefreshIcon />}
            className={cx('btn-reset')}
            type='primary'
            >
            Reset Filter
            </ButtonFinder>
        </div>
        <div className={cx('mt-4')}>
            <PostList />
        </div>
        
    </div>
    )
    
};
export default ReSearch;
