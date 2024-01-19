/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, ConfigProvider, Input, Table, Typography } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getHistoryList, getRequestList } from '../expertServices';
import UserHeaderExpert from '@/app/components/UserHeaderExpert';
import Link from 'next/link';
import moment from 'moment';
import useStore from '@/store/store';
import Search from 'antd/es/input/Search';

const { Title } = Typography;
const columns = [
  {
    title: 'Resume Name',
    dataIndex: 'resumeName',
    render: (text, record) => <Link href={`/expert/view-cv/${record.id}`}>{text} </Link>,
  },
  {
    title: 'Candidate',
    dataIndex: 'candidate',
    render: text => (
      <div>
        {text}
        {/* <Avatar icon={<UserOutlined />} /> {text} */}
      </div>
    ),
  },
  // {
  //   title: 'Price',
  //   dataIndex: 'price',
  //   render: text => <div>{text} đ</div>,
  //   sorter: {
  //     compare: (a, b) => a.price - b.price,
  //     multiple: 3,
  //   },
  // },
  {
    title: 'Price',
    dataIndex: 'price',
    render: text => {
      // Check if text is a string before using replace
      const cleanedText = typeof text === 'string' ? text.replace('.', '') : text;
      
      const parsedNumber = Number(cleanedText);
  
      const formattedPrice = isNaN(parsedNumber)
        ? text // Show the original text if parsing fails
        : parsedNumber.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          });
  
      return <div>{formattedPrice}</div>;
    },
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 3,
    },
  },

  {
    title: 'Review Response',
    dataIndex: 'reviewResponse',
    render: (text, record) => (
      <div>
        {' '}
        {record?.star}{' '}
        {record?.star ? <StarFilled className="mr-1" style={{ color: 'orange' }} /> : null}
        {record?.response}
      </div>
    ),
  },
  {
    title: 'Receive day',
    dataIndex: 'receivedDate',
    sorter: {
      compare: (a, b) => moment(a.receivedDate) - moment(b.receivedDate),
    },
    render: (text, record) => (
      <div className="flex flex-col">
        <div> {moment(record.receivedDate).fromNow()}</div>{' '}
        <div style={{ color: 'gray', fontSize: '11px' }}>
          {moment(record.receivedDate).format('HH:mm:ss DD/MM/YYYY')}
        </div>{' '}
      </div>
    ),
  },
];

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW HISTORY': true,
  });
  const { avatar, email, userRole } = useStore();

  const initialData = [];
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getHistoryList();
      console.log('fetchedDataFromAPI getHistory: ', fetchedDataFromAPI);

      fetchedDataFromAPI.sort((b, a) => moment(a?.receivedDate) - moment(b?.receivedDate));

      // Filter the data to include only those entries with a status of "Done"
      // const filteredData = fetchedDataFromAPI.filter(item => item.status === 'Done');

      setData(fetchedDataFromAPI);
      setFilteredData(fetchedDataFromAPI);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  const [searchValue, setSearchValue] = useState();

  const onSearch = value => {
    if (value) {
      setSearchValue(value);
      const filtered = data.filter(item =>
        item.candidateName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setSearchValue();
      setFilteredData(data);
    }
  };

  return (
    <ConfigProvider>
      <UserLayout
        selected="2"
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        userHeader={<UserHeaderExpert initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container mt-16" style={{ width: '90%' }}>
            <div style={{ textAlign: 'left' }}>
              <Title level={5}>Review History Table</Title>
            </div>
            <div>
              <div>
                <Search
                  allowClear
                  placeholder="Search candidate name"
                  size="large"
                  defaultValue={searchValue}
                  onSearch={onSearch}
                />
              </div>
            </div>
            <div className="!p-0 mb-5 mt-4 card">
              <div className="">
                <Table columns={columns} dataSource={data} onChange={onChange} />
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
