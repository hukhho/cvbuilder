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
import { banUser, getUsers, getWithdrawRequests, unbanUser } from '../adminServices';
import AdminLayout from '@/app/components/Layout/AdminLayout';
import moment from 'moment';

const { Title } = Typography;

// const statuses = ['Waiting', 'Overdue', 'Done'];
// const dateRandome = ['3 days ago', 'Next Tuesday'];

// for (let i = 0; i < 100; i++) {
//   const price = Math.floor(Math.random() * 10) + 1;
//   const due = dateRandome[Math.floor(Math.random() * dateRandome.length)];
//   const status = statuses[Math.floor(Math.random() * statuses.length)];

//   data.push({
//     key: i,
//     resumeName: 'Pham Viet Thuan Thien',
//     name: '<User Name>',
//     note: 'Vel cras auctor at tortor imperdiet amet id sed rhoncus.',
//     price,
//     status,
//     receiveDate: due,
//     deadline: due,
//   });
// }

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'APPLICATION LIST': true,
  });
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

  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getUsers();
      setData(fetchedDataFromAPI);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  // Function to mock banning a job
  const handleBanUser = async customerId => {
    try {
      const result = await banUser(customerId);
      fetchData();
      openNotification('bottomRight', `Save changed ${result}`, 'success');

    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`, 'error');
    }
  };

  const handleUnbanUser = async customerId => {
    try {
      const result = await unbanUser(customerId);
      fetchData();
      openNotification('bottomRight', `Save changed ${result}`, 'success');

    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`, 'error');
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <div>{text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => {
        if (text === 'UnBanned') {
          return <Badge status="success" text={text} />;
        }

        if (text === 'Banned') {
          return <Badge status="error" text={text} />;
        }

        return <Badge status="default" text={text} />;
      },
    },
    {
      title: 'Spend Money',
      dataIndex: 'money',
      render: text => (
        <div>
          {/* {(Number(text)).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })} */}
          {text} đ
        </div>
      ),
    },
    // {
    //   title: 'Create Date',
    //   dataIndex: 'createdDate',
    //   sorter: {
    //     compare: (a, b) => a.createdDate.valueOf() - b.createdDate.valueOf(),
    //     multiple: 1,
    //   },
    //   render: (text, record) => (
    //     <div className="flex flex-col">
    //       <div> {moment(record.createdDate).fromNow()}</div>{' '}
    //       <div style={{ color: 'gray', fontSize: '11px' }}>
    //         {moment(record.createdDate).format('HH:mm:ss DD/MM/YYYY')}
    //       </div>{' '}
    //     </div>
    //   ),
    // },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      sorter: {
        compare: (a, b) => moment(a.createdDate) - moment(b.createdDate),
      },
      render: (text, record) => (
        <div className="flex flex-col">
         {text}
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text, record) => (
        <div>
          {record?.status === 'Banned' ? (
            <button className="" onClick={() => handleUnbanUser(record.id)}>
              Unban
            </button>
          ) : (
            <button onClick={() => handleBanUser(record.id)}>Ban</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider>
      <AdminLayout
        selected="2"
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
