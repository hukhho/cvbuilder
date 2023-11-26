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

import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getRequestList } from '../expertServices';
import UserHeaderExpert from '@/app/components/UserHeaderExpert';

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
        <Avatar icon={<UserOutlined />} /> {text}
      </div>
    ),
  },
  // {
  //   title: 'Note',
  //   dataIndex: 'note',
  // },
  {
    title: 'Price',
    dataIndex: 'price',
    render: text => <div>{text}$</div>,
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 3,
    },
  },
  // {
  //   title: 'Candidate Review',
  //   dataIndex: 'candidateReview',
  //   render: text => (
  //     <div>
  //       {' '}
  //       {text} <StarFilled style={{ color: 'orange' }} />
  //     </div>
  //   ),
  // },
  {
    title: 'Review Response',
    dataIndex: 'reviewResponse',
    render: text => (
      <div>
        {' '}
        {text} <StarFilled style={{ color: 'orange' }} />
      </div>
    ),
  },
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  //   render: text => {
  //     if (text === 'Waiting') {
  //       return <Badge status="warning" text={text} />;
  //     }
  //     if (text === 'Overdue') {
  //       return <Badge status="error" text={text} />;
  //     }
  //     if (text === 'Done') {
  //       return <Badge status="success" text={text} />;
  //     }
  //     return <Badge status="done" text={text} />;
  //   },
  // },
  {
    title: 'Receive day',
    dataIndex: 'receiveDay',
    sorter: {
      compare: (a, b) => a.revicedDay - b.revicedDay,
      multiple: 2,
    },
  },
  // {
  //   title: 'Deadline',
  //   dataIndex: 'deadline',
  //   sorter: {
  //     compare: (a, b) => a.deadline - b.deadline,
  //     multiple: 1,
  //   },
  // },
];
// const data = [];
// const statuses = ['Waiting', 'Overdue', 'Done'];
// const dateRandome = ['3 days ago', 'Next Tuesday'];

// for (let i = 0; i < 100; i++) {
//   const price = Math.floor(Math.random() * 10) + 1;
//   const due = dateRandome[Math.floor(Math.random() * dateRandome.length)];
//   const status = statuses[Math.floor(Math.random() * statuses.length)];

//   data.push({
//     key: i,
//     resumeName: 'Pham Viet Thuan Thien',
//     candidate: '<User Name>',
//     reviewResponse: 'Vel cras auctor at tortor imperdiet amet id sed rhoncus.',
//     candidateReview: 3.5,

//     price,
//     status,
//     receiveDay: due,
//     deadline: due,
//   });
// }

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW HISTORY': true,
  });

  const [data, setData] = useState();
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getRequestList();
      setData(fetchedDataFromAPI);
    } catch (error) {
      console.log("getReviewRequestsByCandiate:Error: ", error)
    }
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        userHeader={<UserHeaderExpert initialEnabledCategories={enabledCategories} />
        }
        content={
          <div className="container">
            <div className="!p-0 mb-5 mt-16 card">
              <div style={{ textAlign: 'left' }}>
                {/* <Title level={5}>CV Review Table</Title> */}
              </div>
              <div>
                <Input className="" placeholder="Search the resume" />;
              </div>
              <div>
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
