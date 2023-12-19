/* eslint-disable */
'use client';

import React, { Suspense, useEffect, useState } from 'react';
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
  DatePicker,
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
import { getChartsMoney, getUsers, getWithdrawRequests } from '../adminServices';
import AdminLayout from '@/app/components/Layout/AdminLayout';
import moment from 'moment';

import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const { Title } = Typography;

const ColumnChart = React.lazy(() => import('./Column'));

const Dashboard = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'APPLICATION LIST': true,
  });
  const initialData = [];

  const [data, setData] = useState(initialData);

  const [selectedRang, setSelectedRang] = useState([dayjs().add(-7, 'd'), dayjs()]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      const currentDate = dayjs();

      const sevenDaysAgo = dayjs().subtract(7, 'd');
      const formattedDateStart = sevenDaysAgo.format('YYYY-MM-DD');
      const formattedDateEnd = currentDate.format('YYYY-MM-DD');

      console.log('Current Date: ', formattedDateStart);
      console.log('Seven Days Ago: ', formattedDateEnd);
      const submit = {
        start: formattedDateStart,
        end: formattedDateEnd,
      };
      const fetchedDataFromAPI = await getChartsMoney(submit);
      setData(fetchedDataFromAPI);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  const onRangeChange = async (dates, dateStrings) => {
    if (dates) {
      try {
        setSelectedRang(dates);
        const submit = {
          start: dateStrings[0],
          end: dateStrings[1],
        };

        const fetchedDataFromAPI = await getChartsMoney(submit);
        setData(fetchedDataFromAPI);
      } catch (error) {
        console.log('getReviewRequestsByCandiate:Error: ', error);
      }
    } else {
      console.log('Clear');
    }
  };
  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs()],
    },
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
                    <Title>$ {data?.income}</Title>
                  </div>
                </Card>
                <Card style={{ width: 278, height: 182 }}>
                  <div className="text-gray-500">Monthly active users</div>
                  <div>
                    <Title>{data?.userLogin}</Title>
                  </div>
                </Card>{' '}
                <Card style={{ width: 278, height: 182 }}>
                  <div className="text-gray-500">Total users</div>
                  <div>
                    <Title>{data?.totalUser}</Title>
                  </div>
                </Card>
              </Space>{' '}
            </div>
            <div></div>

            <div className="mt-8">
              <Title level={5}>Revenue Chart</Title>
            </div>
            <RangePicker
              presets={rangePresets}
              value={selectedRang}
              className="mt-2 mb-5 "
              onChange={onRangeChange}
            />

            <div className="!p-0 mt-4 mb-5 card">
              <div className="">
                <Suspense fallback={<div>Loading Chart...</div>}>
                  {
                    data?.chart && (<ColumnChart data={data?.chart} />)
                  }
                  
                </Suspense>
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Dashboard;
