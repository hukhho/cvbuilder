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
import { getReviewRequestsByCandiate } from '../../new/reviewService';

const { Title } = Typography;
const columns = [
  {
    title: 'Resume Name',
    dataIndex: 'resumeName',
    render: text => <a>{text}</a>,
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
];
const statuses = ['Waiting', 'Overdue', 'Done'];
const dateRandome = ['3 days ago', 'Next Tuesday'];

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
    'MY REVIEWS': true,
  });
  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log("fetchData getReviewRequestsByCandiate")
      const fetchedDataFromAPI = await getReviewRequestsByCandiate();
      setData(fetchedDataFromAPI);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("useEffect")

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
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
