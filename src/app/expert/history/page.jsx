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
import Link from 'next/link';
import moment from 'moment';
import useStore from '@/store/store';

const { Title } = Typography;
const columns = [
  {
    title: 'Resume Name',
    dataIndex: 'resumeName',
    render: (text, record) => <Link href={`/expert/view-cv/${record.id}`}>{text} </Link>,
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
    render: text => <div>{text}.000đ</div>,
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
    dataIndex: 'receivedDate',
    sorter: {
      compare: (a, b) => moment(a.receivedDate) - moment(b.receivedDate),
    },
    render: (text, record) => (
      <div className="flex flex-col">
        <div> {moment(record.receivedDate).fromNow()}</div>{' '}
        <div style={{ color: 'gray', fontSize: '11px' }}>
          {moment(record.receivedDate).format('HH:mm:ss DD/MM/YYYY')}
        </div>{' '}
      </div>
    ),
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
  const { avatar, email, userRole } = useStore();

  const [data, setData] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState();

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getRequestList();
      console.log('fetchedDataFromAPI getRequestList: ', fetchedDataFromAPI);
  
      // Filter the data to include only those entries with a status of "Done"
      const filteredData = fetchedDataFromAPI.filter(item => item.status === 'Done');
  
      setData(filteredData);
      setSearchData(filteredData);
  
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };
  


  const handleSearch = (value) => {
    setSearchText(value);
    console.log("handleSearch")
    if (value === '') {
      setSearchData(data);
      return;
    }
  
    const filteredData = data.filter(item => {
      const searchString = value.toLowerCase();
      return (
        item.resumeName.toLowerCase().includes(searchString) ||
        item.name.toLowerCase().includes(searchString) ||
        item.note.toLowerCase().includes(searchString)
      );
    });
    // Update the data state with the filtered data
    setSearchData(filteredData);
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        userHeader={<UserHeaderExpert initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container mt-16" style={{ width: '90%' }}>
          <div style={{ textAlign: 'left' }}>
            <Title level={5}>Review History Table</Title>
          </div>
          <div>
            <div>
              <Input
                className=""
                placeholder="Search the resume"
                value={searchText}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="!p-0 mb-5 mt-4 card">
            <div className="">
              <Table columns={columns} dataSource={searchData} onChange={onChange} />
            </div>
          </div>
        </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
