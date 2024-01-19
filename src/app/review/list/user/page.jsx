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

import { UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import {
  getReviewRequestsByCandiate,
  getReviewRequestsByCandiateSearch,
} from '../../new/reviewService';
import Link from 'next/link';
import moment from 'moment';
import useStore from '@/store/store';

const { Title } = Typography;
const { Search } = Input;

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'MY REVIEWS': true,
  });
  const { avatar, email, userRole } = useStore();

  const initialData = [];

  const [data, setData] = useState(initialData);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [value, setValue] = useState('');

  const columns = [
    {
      title: 'Resume Name',
      dataIndex: 'resumeName',
      render: (text, record) => {
        if (record.status !== 'Processing') {
          return <Link href={`/review/view-response/${record.id}`}>{text}</Link>;
        } else {
          return text; // Display the text without a link if status is not "Done"
        }
      },
    },
    {
      title: 'Expert Name',
      dataIndex: 'expert',
      render: text => (
        <div>
          <Avatar className="mr-2" icon={<UserOutlined />} />
          {text}
        </div>
      ),
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
    // {
    //   title: 'Price',
    //   dataIndex: 'price',
    //   render: text => (
    //     <div>
    //       {/* {Number(text).toLocaleString('vi-VN', {
    //         style: 'currency',
    //         currency: 'VND',
    //       })} */}
    //       {text}
    //     </div>
    //   ),
    //   sorter: {
    //     compare: (a, b) => a.price - b.price,
    //     multiple: 3,
    //   },
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      render: text => {
        const cleanedText = text.replace('.', ''); // Remove the decimal separator
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
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Waiting', value: 'Waiting' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Overdue', value: 'Overdue' },
        { text: 'Done', value: 'Done' },
        { text: 'Null', value: null },
      ],
      onFilter: (value, record) => record.status === value,

      render: text => {
        if (text === 'Waiting') {
          return <Badge status="warning" text={text} />;
        }
        if (text === 'Processing') {
          return <Badge status="warning" text={text} />;
        }
        if (text === 'Overdue') {
          return <Badge status="error" text={text} />;
        }
        if (text === 'Done') {
          return <Badge status="success" text={text} />;
        }
        if (text === null) {
          return <Badge status="warning" text="Waiting" />;
        }
        return <Badge status="warning" text={text} />;
      },
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
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      sorter: {
        compare: (a, b) => moment(a.deadline) - moment(b.deadline),
      },
      render: (text, record) => (
        <div className="flex flex-col">
          <div> {moment(record.deadline).fromNow()}</div>{' '}
          <div style={{ color: 'gray', fontSize: '11px' }}>
            {moment(record.deadline).format('HH:mm:ss DD/MM/YYYY')}
          </div>{' '}
        </div>
      ),
    },
  ];
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getReviewRequestsByCandiate();
      fetchedDataFromAPI.sort((b, a) => moment(a.receivedDate) - moment(b.receivedDate));

      setData(fetchedDataFromAPI);
    } catch (error) {}
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  const onSearch = async value => {
    setValue(value);
    console.log('fetchData getReviewRequestsByCandiate');
    const fetchedDataFromAPI = await getReviewRequestsByCandiateSearch(value);
    setData(fetchedDataFromAPI);
  };

  return (
    <ConfigProvider>
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="4"
        userHeader={
          <>
            <UserHeaderReview initialEnabledCategories={enabledCategories} />
          </>
        }
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            <div style={{ textAlign: 'left' }}>
              <Title level={5}>CV Review Table</Title>
            </div>
            <div>
              <Search
                placeholder="Search the resume"
                allowClear
                size="large"
                onSearch={onSearch}
                defaultValue={value}
              />
            </div>
            <div className="!p-0 mb-5 mt-5 card">
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
