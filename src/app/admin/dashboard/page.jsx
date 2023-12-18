/* eslint-disable */
'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  ConfigProvider,
  Input,
  Space,
  Table,
  Typography,
  Upload,
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
import { getUsers, getWithdrawRequests } from '../adminServices';
import AdminLayout from '@/app/components/Layout/AdminLayout';
import moment from 'moment';
import ColumnChart from './Column';


const { Title } = Typography;

const Dashboard = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'APPLICATION LIST': true,
  });
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

  const chartData = [
    {
      date: '2023-01-01',
      sales: 100,
    },
    {
      date: '2023-01-02',
      sales: 150,
    },
    {
      date: '2023-01-03',
      sales: 200,
    },
    {
      date: '2023-01-04',
      sales: 120,
    },
    {
      date: '2023-01-05',
      sales: 120,
    },
    {
      date: '2023-01-06',
      sales: 120,
    },
    {
      date: '2023-01-07',
      sales: 120,
    },
    // Add more data for other dates
  ];
  return (
    <ConfigProvider>
      <AdminLayout
        selected="1"
        userHeader={<></>}
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            <div style={{ textAlign: 'left' }}>
              <Space size={[24, 16]} wrap>
                <Card style={{ width: 278, height: 182 }}>
                  <div className="text-gray-500">Total revenue</div>
                  <div>
                    <Title>$ 126,560</Title>
                  </div>
                </Card>
                <Card style={{ width: 278, height: 182 }}>
                  <div className="text-gray-500">Monthly active users</div>
                  <div>
                    <Title>8,846</Title>
                  </div>
                </Card>{' '}
                <Card style={{ width: 278, height: 182 }}>
                  <div className="text-gray-500">Total users</div>
                  <div>
                    <Title>5,000</Title>
                  </div>
                </Card>
              </Space>{' '}
            </div>
            <div></div>
            <div className="!p-0 mt-16 mb-5 card">
              <div className="">
                <ColumnChart data={chartData} />
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Dashboard;
