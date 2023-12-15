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
import { getExpertPurchases } from '../expertServices';
import ExpertConfigHeader from '@/app/components/ExpertConfigHeader';

const { Title } = Typography;
const columns = [
  // {
  //   title: 'Job posting',
  //   dataIndex: 'title',
  //   render: text => <a>{text}</a>,
  // },

  {
    title: 'Transaction',
    dataIndex: 'transactionType',
  },
  // {
  //   title: 'Cv',
  //   dataIndex: 'cvs',
  //   render: cvs => (
  //     <a>
  //       <Link href={`/hr/view-cv/${cvs.historyId}`}>{cvs.historyId}</Link>{' '}
  //     </a>
  //   ),
  // },
  {
    title: 'Amount',
    dataIndex: 'expenditure',
  },

  {
    title: 'Date',
    dataIndex: 'createdDate',
    // sorter: {
    //   compare: (a, b) => a.revicedDay - b.revicedDay,
    //   multiple: 2,
    // },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: text => {
      if (text === 'Published') {
        return <Badge status="success" text={text} />;
      }
      if (text === 'Draft') {
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
  // {
  //   title: 'note',
  //   dataIndex: 'note',
  // },
  // {
  //   title: 'email',
  //   dataIndex: 'email',
  // },
  // {
  //   title: 'Action',
  //   dataIndex: 'id',
  //   render: text => <div><Link href={`/hr/post/${text}`}><FontAwesomeIcon icon={faEdit} />Edit</Link> </div>,

  // },
];
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
    'PURCHASE HISTORY': true,
  });
  const initialData = [];

  const [data, setData] = useState(initialData);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getExpertPurchases();
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
        selected="5"
        userHeader={<ExpertConfigHeader initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            <div style={{ textAlign: 'left' }}>
              {/* <Title level={5}>CV Review Table</Title> */}
            </div>
            <div>
              <Input className="" placeholder="Search the transaction" />
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
