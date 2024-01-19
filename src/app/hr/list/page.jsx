/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, ConfigProvider, Input, Skeleton, Table, Typography } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getReviewRequestsByCandiate } from '@/app/review/new/reviewService';
import { getHrPostList } from '../hrServices';
import HeaderHR from '@/app/components/HeaderHR';
import Link from 'next/link';
import useStore from '@/store/store';
import Search from 'antd/es/input/Search';
import { useRouter } from 'next/router';

const { Title } = Typography;
const columns = [
  {
    title: 'Job posting',
    dataIndex: 'title',
    render: (text, record) => <Link href={`/hr/application/job/${record?.id}`}>{text}</Link>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: text => {
      if (text === 'Published') {
        return <Badge status="success" text={text} />;
      }
      if (text === 'Draft') {
        return <Badge status="warning" text={text} />;
      }
      if (text === 'Overdue') {
        return <Badge status="error" text={text} />;
      }
      if (text === 'Unpiblish') {
        return <Badge status="warning" text={text} />;
      }
      if (text === 'Disable') {
        return <Badge status="warning" text={text} />;
      }
      return <Badge status="warning" text={text} />;
    },
    filters: [
      { text: 'Published', value: 'Published' },
      { text: 'Draft', value: 'Draft' },
      { text: 'Overdue', value: 'Overdue' },
      { text: 'Unpublish', value: 'Unpublish' },
      { text: 'Disable', value: 'Disable' },
    ],
    onFilter: (value, record) => record?.status === value,
  },

  {
    title: 'View',
    dataIndex: 'view',
    sorter: (a, b) => a.view - b.view, // Add sorter function for sorting by 'view'
    // You can add any custom rendering logic for the 'View' column here
  },
  {
    title: 'Application',
    dataIndex: 'application',
    sorter: {
      compare: (a, b) => a?.application - b?.application,
      multiple: 2,
    },
  },

  {
    title: 'Create Date',
    dataIndex: 'timestamp',
    // sorter: {
    //   compare: (a, b) => a.revicedDay - b.revicedDay,
    //   multiple: 2,
    // },
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: text => (
      <div>
        <Link href={`/hr/post/${text}`}>
          <FontAwesomeIcon icon={faEdit} />
          Edit
        </Link>{' '}
      </div>
    ),
  },
];

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'MANAGE JOBS': true,
  });
  const { avatar, email, userRole } = useStore();

  const initialData = [];

  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };

  // const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchedDataFromAPI = await getHrPostList();
      setData(fetchedDataFromAPI);
      setFilteredData(fetchedDataFromAPI);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log('useEffect');
    fetchData();
  }, []);
  const [searchValue, setSearchValue] = useState();

  const onSearch = value => {
    if (value) {
      setSearchValue(value);
      const filtered = data?.filter(item =>
        item?.title.toLowerCase().includes(value.toLowerCase()),
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
        selected="3"
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        userHeader={
          <>
            <HeaderHR initialEnabledCategories={enabledCategories} />
          </>
        }
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            <div style={{ textAlign: 'left' }}>
              {/* <Title level={5}>CV Review Table</Title> */}
            </div>
            <div>
              <Search
                allowClear
                placeholder="Search candidate name"
                size="large"
                defaultValue={searchValue}
                onSearch={onSearch}
              />{' '}
            </div>
            <div className="!p-0 mb-5 mt-5 card">
              <div className="">
                {isLoading && <Skeleton />}
                {!isLoading && (
                  <Table columns={columns} dataSource={filteredData} onChange={onChange} />
                )}
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
