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
import UserHeaderJob from '@/app/components/UserHeaderJob';
import { getCandidateApplication, getHrApplication } from '@/app/hr/hrServices';
import useStore from '@/store/store';
import Search from 'antd/es/input/Search';

const { Title } = Typography;
const columns = [
  // {
  //   title: 'Job posting',
  //   dataIndex: 'title',
  //   render: text => <a>{text}</a>,
  // },
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
  {
    title: 'Candidate',
    dataIndex: 'candidateName',
  },
  {
    title: 'Job Title',
    dataIndex: 'jobPosting',
    render: job => (
      <a>
        <Link href={`/job/${job?.id}`}>{job?.name}</Link>{' '}
      </a>
    ),
  },
  {
    title: 'Company',
    dataIndex: 'company',
  },
  {
    title: 'Cv',
    dataIndex: 'cvs',
    render: cvs => (
      <a>
        <Link href={`/job/view-cv/${cvs?.id}`}>{cvs?.resumeName}</Link>{' '}
      </a>
    ),
  },
  {
    title: 'Cover Letter',
    dataIndex: 'coverLetters',
    render: cvs => (
      <a>
        <Link href={`/job/view-cover-letter/${cvs?.id}`}>{cvs?.title}</Link>
      </a>
    ),
  },

  {
    title: 'Date Application',
    dataIndex: 'applyDate',
    // sorter: {
    //   compare: (a, b) => a.revicedDay - b.revicedDay,
    //   multiple: 2,
    // },
  },
  {
    title: 'note',
    dataIndex: 'note',
    render: text => (text !== undefined || null || '' ? <div>{text}</div> : null),
  },

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
    'MY APPLICATION': true,
  });
  const { avatar, email, userRole } = useStore();

  const initialData = [];

  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getCandidateApplication();
      console.log('fetchData fetchedDataFromAPI: ', fetchedDataFromAPI);

      setData(fetchedDataFromAPI);
      setFilteredData(fetchedDataFromAPI);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  const [searchValue, setSearchValue] = useState();

  const onSearch = (value) => {
    if (value) {
      setSearchValue(value);
      const filtered = data.filter(item => item.candidateName.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setSearchValue();
      setFilteredData(data);
    }
  };
  

  return (
    <ConfigProvider>
      <UserLayout
        selected="8"
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        userHeader={
          <>
            <UserHeaderJob initialEnabledCategories={enabledCategories} />
          </>
        }
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            <div style={{ textAlign: 'left' }}>
              {/* <Title level={5}>CV Review Table</Title> */}
            </div>
            <div>
              <Search
                allowClear
                placeholder="Search candidate name"
                size="large"
                defaultValue={searchValue}
                onSearch={onSearch}
              />
            </div>
            <div className="!p-0 mb-5 mt-8 card">
              <div className="">
                <Table columns={columns} dataSource={filteredData} onChange={onChange} />
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
