/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Card,
  Col,
  ConfigProvider,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import UserHeaderJob from '@/app/components/UserHeaderJob';
import Image from 'next/image';
import JobCard from './JobCard';
import { getCandidateList } from '../hrServices';
import UserHeaderHR from '@/app/components/UserHeaderHR';
import HeaderHR from '@/app/components/HeaderHR';

const { Title } = Typography;

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    "BROSWER CVS": true,
  });
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getCandidateList();
      setData(fetchedDataFromAPI);
      console.log('Candidate List', fetchedDataFromAPI);
    } catch (error) {}
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        userHeader={<HeaderHR initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0 mb-5 mt-0 card">
              <div style={{ textAlign: 'left' }} />
              <div className="flex mt-16">
                <div style={{ width: 500 }}>
                  <Input placeholder="Search by title or company" />;
                </div>
                <div style={{ width: 200 }} className="ml-8">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="All Location"
                    // defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    options={options}
                  />{' '}
                </div>
              </div>
              <div>
                <div className="flex">
                </div>
                <div className="">
                  {data?.map((job, index) => (
                    <JobCard job={job} jobTitle={job.title} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
