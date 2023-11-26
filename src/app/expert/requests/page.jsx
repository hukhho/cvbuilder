/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, ConfigProvider, Input, Table, Typography, notification } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { acceptRequest, getRequestList, rejectRequest } from '../expertServices';
import Link from 'next/link';
import UserHeaderExpert from '@/app/components/UserHeaderExpert';

const { Title } = Typography;

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW REQUESTS': true,
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Thong bao',
      description: message,
      placement,
    });
  };

  const handleActionAccept = async requestId => {
    try {
      console.log('handleActionAccept ', requestId);
      const result = await acceptRequest(requestId);
      openNotification('bottomRight', `Save changed: ${result}`);
    } catch (error) {
      console.log('error ', error);
      openNotification('bottomRight', `Error: ${error}`);
    }
  };
  const handleActionReject = async requestId => {
    try {
      console.log('handleActionReject ', requestId);
      const result = await rejectRequest(requestId);
      openNotification('bottomRight', `Save changed: ${result}`);
    } catch (error) {
      console.log('error ', error);
      openNotification('bottomRight', `Error: ${error}`);
    }
  };

  const columns = [
    {
      title: 'Resume Name',
      dataIndex: 'resumeName',
      render: (text, record) => <Link href={`/expert/view-cv/${record.id}`}>{text} </Link>,
    },
    {
      title: 'Candidate',
      dataIndex: 'name',
      render: text => (
        <div>
          {' '}
          <Avatar icon={<UserOutlined />} /> {text}
        </div>
      ),
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: text => <div>{text}$</div>,
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
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
        return <Badge status="warning" text={text} />;
      },
    },
    {
      title: 'Receive day',
      dataIndex: 'receivedDate',
      sorter: {
        compare: (a, b) => a.revicedDay - b.revicedDay,
        multiple: 2,
      },
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      sorter: {
        compare: (a, b) => a.deadline - b.deadline,
        multiple: 1,
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: text => (
        <div>
          <a onClick={() => handleActionAccept(text)} className='mr-2'>Accecpt</a>
          <a onClick={() => handleActionReject(text)}>Reject</a>
        </div>
      ),
    },
  ];
  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getRequestList();
      setData(fetchedDataFromAPI);
    } catch (error) {}
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        userHeader={
          <>
            <UserHeaderExpert initialEnabledCategories={enabledCategories} />
          </>
        }
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            {contextHolder}
            <div style={{ textAlign: 'left' }}>
              <Title level={5}>CV Review Table</Title>
            </div>
            <div>
              <Input className="" placeholder="Search the resume" />;
            </div>
            <div className="!p-0 mb-5 card">
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
