/* eslint-disable */

'use client';

import '../../components/Form/customtext.css';
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
import {
  getCandidateList,
  getCandidateListByKeyword,
  getCandidateListMatchByPostId,
  getHrPostList,
} from '../hrServices';
import UserHeaderHR from '@/app/components/UserHeaderHR';
import HeaderHR from '@/app/components/HeaderHR';
import useStore from '@/store/store';
import Search from 'antd/es/input/Search';

const { Title } = Typography;

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'BROSWER CVS': true,
  });
  const { avatar, email, userRole } = useStore();

  const options = [];

  const [selectedJob, setSelectedJob] = useState();

  const handleChange = async value => {
    console.log(`selected ${value}`);
    if (value > 0) {
      try {
        setSelectedJob(value);

        const fetchedDataFromAPI = await getCandidateListMatchByPostId(value);

        setData(fetchedDataFromAPI);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      setSelectedJob(null);
      fetchData();
    }
  };

  const [data, setData] = useState();
  const [jobs, setJobs] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getCandidateList();
      setData(fetchedDataFromAPI);
      console.log('Candidate List', fetchedDataFromAPI);
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchPostingJobs = async () => {
    try {
      const fetchedJobFromAPI = await getHrPostList();

      setJobs(fetchedJobFromAPI);

      const jobOptions = fetchedJobFromAPI.map(job => ({
        value: job?.id,
        label: job?.title,
      }));
      setJobs(jobOptions);
      console.log('fetchedJobFromAPI:', fetchedJobFromAPI);
    } catch (error) {}
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
    fetchPostingJobs();
  }, []);
  const [searchValue, setSearchValue] = useState('');

  const onSearch = async (value, _e, info) => {
    const result = await getCandidateListByKeyword(value);
    setData(result);
  };
  return (
    <ConfigProvider>
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="3"
        userHeader={<HeaderHR initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div style={{ textAlign: 'left' }} />
            <div className="flex mt-6 mb-16">

              <div className="flex" style={{ width: 1000 }}>
                <Search
                  placeholder="Search by title or company"
                  size="large"
                  className="custom-parent"
                  defaultValue={searchValue}
                  onSearch={onSearch}
                />
                <Select
                  allowClear
                  style={{
                    height: '50px',
                    width: '100%',
                  }}
                  value={selectedJob}
                  placeholder="Choose your job to match"
                  onChange={handleChange}
                  options={jobs}
                />
              </div>
            </div>

            <div style={{}} className="!p-0 mb-5 mt-0">
              <div className="">
                <div className="flex"></div>
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
