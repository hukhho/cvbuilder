/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, ConfigProvider, Input, Table, Typography } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getReviewRequestsByCandiate } from '@/app/review/new/reviewService';
import HeaderHR from '@/app/components/HeaderHR';
import Link from 'next/link';
import CandidateConfigHeader from '@/app/components/CandidateConfigHeader';
import { getCandidatePurchases } from '../candidateServices';
import moment from 'moment';
import useStore from '@/store/store';

const { Title } = Typography;
const columns = [
  {
    title: 'Transaction Name',
    dataIndex: 'responseMessage',
  },

  {
    title: 'Amount',
    dataIndex: 'expenditure',
    render: (text, record) => {
      const isAddTransaction = record.transactionType === 'ADD';
      const amountStyle = isAddTransaction ? { color: 'green' } : { color: 'red' };
      const sign = isAddTransaction ? '+' : '-';

      return (
        <div style={amountStyle}>
          {sign}
          {Number(text).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
      );
    },
    sorter: (a, b) => a.expenditure - b.expenditure,
  },

  {
    title: 'Date',
    dataIndex: 'createdDate',
    sorter: {
      compare: (a, b) => moment(a.createdDate) - moment(b.createdDate),
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
];

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'PURCHASE HISTORY': true,
  });
  const { avatar, email, userRole } = useStore();

  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getCandidatePurchases();
      fetchedDataFromAPI.sort((b, a) => moment(a.createdDate) - moment(b.createdDate));

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
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="7"
        userHeader={
          <>
            <CandidateConfigHeader initialEnabledCategories={enabledCategories} />
          </>
        }
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            <div style={{ textAlign: 'left' }}>
              {/* <Title level={5}>CV Review Table</Title> */}
            </div>
            <div>{/* <Input className="" placeholder="Search the candiatename" /> */}</div>
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
