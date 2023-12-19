/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, ConfigProvider, Input, Table, Typography, Upload } from 'antd';
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
import { getWithdrawRequests } from '../adminServices';
import AdminLayout from '@/app/components/Layout/AdminLayout';
import moment from 'moment';

const { Title } = Typography;

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'APPLICATION LIST': true,
  });
  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(data?.avatar);
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const url = info.file.response;
      console.log('info.file.response: ', url);
      setLoading(false);
      setImageUrl(url);
    }
  };

  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getWithdrawRequests();
      setData(fetchedDataFromAPI);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);
  const accessToken = localStorage?.getItem('accessToken');

  const columns = [
    {
      title: 'Expert Name',
      dataIndex: 'userId',
      render: text => <div>{text} Ko có</div>,
    },

    {
      title: 'Money request',
      dataIndex: 'expenditure',
      render: text => (
        <div>
          {Number(text).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => {
        if (text === 'Done') {
          return <Badge status="success" text={text} />;
        }
        if (text === 'Waiting') {
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
    },
    {
      title: 'Create Date',
      dataIndex: 'createdDate',
      sorter: {
        compare: (a, b) => a.createdDate.valueOf() - b.createdDate.valueOf(),
        multiple: 1,
      },
      render: (text, record) => (
        <div className="flex flex-col">
          <div> {moment(record.createdDate).fromNow()}</div>{' '}
          <div style={{ color: 'gray', fontSize: '11px' }}>
            {moment(record.createdDate).format('HH:mm:ss DD/MM/YYYY')}
          </div>{' '}
        </div>
      ),
    },
    {
      title: 'Bank infomation',
      dataIndex: 'bankInfo',
      render: text => <div>{text} Ko có</div>,
    },
    {
      title: 'Proof money transfer',
      dataIndex: 'bankInfo',
      render: text => (
        <div>
          {text}
          <Upload
            showUploadList={false}
            action="https://api-cvbuilder.monoinfinity.net/api/messages/public/upload/image"
            headers={{ authorization: `Bearer ${accessToken}` }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <Avatar src={imageUrl} alt="avatar" size={100} />
            ) : (
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            )}
          </Upload>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: text => (
        <div>
          <button>Finish confirm</button>{' '}
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider>
      <AdminLayout
        selected="4"
        userHeader={<></>}
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
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
