/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Input,
  Table,
  Typography,
  Upload,
  notification,
} from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getReviewRequestsByCandiate } from '@/app/review/new/reviewService';
import HeaderHR from '@/app/components/HeaderHR';
import Link from 'next/link';
import { banJob, getPostingJobs, getUsers, getWithdrawRequests, unbanJob } from '../adminServices';
import AdminLayout from '@/app/components/Layout/AdminLayout';
import moment from 'moment';

const { Title } = Typography;

const Home = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, type = 'info') => {
    const notificationTypes = {
      info: api.info,
      success: api.success,
      warning: api.warning,
      error: api.error,
    };

    const notificationFunc = notificationTypes[type] || api.info;

    notificationFunc({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const [enabledCategories, setEnabledCategories] = useState({
    'APPLICATION LIST': true,
  });
  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  // Function to mock banning a job
  const handleBanJob = async jobId => {
    console.log(`Banning job with ID: ${jobId}`);
    try {
      const result = await banJob(jobId);
      openNotification('bottomRight', `Save changed ${result}`, 'success');
    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`, 'error');
    }
  };

  const handleUnbanJob = async jobId => {
    console.log(`Banning job with ID: ${jobId}`);
    try {
      const result = await unbanJob(jobId);
      openNotification('bottomRight', `Save changed ${result}`, 'success');
    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`, 'error');
    }
  };
  const columns = [
    {
      title: 'Job posting name',
      dataIndex: 'jobTitle',
      render: text => <div>{text}</div>,
    },
    {
      title: 'Company name',
      dataIndex: 'company',
      render: text => <div>{text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => {
        if (text === 'Published') {
          return <Badge status="success" text={text} />;
        }
        if (text === 'Draft') {
          return <Badge status="processing" text={text} />;
        }
        if (text === 'Overdue') {
          return <Badge status="error" text={text} />;
        }
        if (text === 'Unpublish') {
          return <Badge status="warning" text={text} />;
        }
        if (text === 'Disable') {
          return <Badge status="default" text={text} />;
        }
        return <Badge status="warning" text={text} />;
      },
    },
    {
      title: 'Ower',
      dataIndex: 'owner',
      render: text => <div>{text}</div>,
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      sorter: {
        compare: (a, b) => moment(a.createDate) - moment(b.createDate),
      },
      render: (text, record) => (
        <div className="flex flex-col">
          <div> {moment(record.createDate).fromNow()}</div>{' '}
          <div style={{ color: 'gray', fontSize: '11px' }}>
            {moment(record.createDate).format('HH:mm:ss DD/MM/YYYY')}
          </div>{' '}
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text, record) => (
        <div>
          <button onClick={() => handleBanJob(record.id)}>Ban</button>
          <button className="ml-4" onClick={() => handleUnbanJob(record.id)}>
            Unban
          </button>
        </div>
      ),
    },
  ];
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getPostingJobs();
      setData(fetchedDataFromAPI);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <AdminLayout
        selected="3"
        userHeader={<></>}
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            {contextHolder}
            <div style={{ textAlign: 'left' }}>
              {/* <Title level={5}>CV Review Table</Title> */}
            </div>
            <div>
              <Input className="" placeholder="Search by name" />
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
