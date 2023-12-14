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
import moment from 'moment';

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
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getRequestList();
      setData(fetchedDataFromAPI);
    } catch (error) {}
  };

  const handleActionAccept = async requestId => {
    try {
      console.log('handleActionAccept ', requestId);
      const result = await acceptRequest(requestId);
      fetchData();
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
      render: (text, record) => {
        if (record.status === 'Processing') {
          return <Link href={`/expert/view-cv/${record.id}`}>{text}</Link>;
        } else {
          return <span>{text}</span>; // Just display the text if status is not "Processing"
        }
      },
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
      render: text => <div>{text}.000đ</div>,
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
        compare: (a, b) => a.revicedDay - b.revicedDay,
        multiple: 2,
      },
      render: (text, record) => (
        <div className="flex flex-col">
          <div> {moment(record.revicedDay).fromNow()}</div>{' '}
          <div style={{ color: 'gray', fontSize: '11px' }}>
            {moment(record.revicedDay).format('HH:mm:ss DD/MM/YYYY')}
          </div>{' '}
        </div>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      sorter: {
        compare: (a, b) => a.deadline.valueOf() - b.deadline.valueOf(),
        multiple: 1,
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
    {
      title: 'Action',
      dataIndex: 'status',
      render: (text, record) => {
        if (text === 'Processing') {
          return <Link href={`/expert/view-cv/${record.id}`}>Edit</Link>;
        } else if (text === 'Waiting' || text === null) {
          return (
            <>
              <a onClick={() => handleActionAccept(record.id)} className="mr-2">
                Accept
              </a>
              <a onClick={() => handleActionReject(record.id)}>Reject</a>
            </>
          );
        }
        // If status is not "Waiting," "Processing," or null, return null or an empty element
        return null;
      },
    },
  ];
  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
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
          <div className="container mt-16" style={{ width: '90%' }}>
            {contextHolder}
            <div style={{ textAlign: 'left' }}>
              <Title level={5}>CV Review Table</Title>
            </div>
            <div>
              <Input className="" placeholder="Search the resume" />
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
