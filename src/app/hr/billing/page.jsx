/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
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

import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
// import UserHeaderExpert from '@/app/components/UserHeaderExpert';
import ExpertForm from '@/app/components/Form/ExpertForm';
import HrForm from '@/app/components/Form/HrForm';
import { getHrConfig, getVipList } from '../hrServices';
import useStore from '@/store/store';
import CandidateConfigHeader from '@/app/components/CandidateConfigHeader';
import HRConfigHeader from '@/app/components/HRConfigHeader';
import Title from 'antd/es/typography/Title';
import MonthSub from '@/app/components/Modal/MonthSub';

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    BILLING: true,
  });
  const { avatar, email, userRole } = useStore();

  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [resumes, setResumes] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getVipList();
      console.log('fetchedDataFromAPI: ', fetchedDataFromAPI);

      setData(fetchedDataFromAPI);
      form.setFieldsValue(fetchedDataFromAPI);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  const onCreated = () => {
    // form.setFieldsValue({
    //   //   note: 'Hello world!',
    //   //   gender: 'male',
    // });
    console.log('onCreated');
  };

  return (
    <ConfigProvider>
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="6"
        userHeader={<HRConfigHeader initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0 mb-5 mt-16 ">
              <div className="flex" style={{ textAlign: 'left' }}>
                <div style={{ width: 200, height: 300, marginRight: 50 }}>
                  <Title level={2}>Choose a plan</Title>
                  <div>
                    <span className="text-gray-600">WHAT'S INCLUED</span>
                  </div>
                  <div className="mt-8">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-gray-600">Unlimited access to quality candidate CVs</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-gray-600">
                      {' '}
                      Easy search functionality similar to LinkedIn
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-gray-600">Download unlimited CVs</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-gray-600">Create and post unlimited job postings</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-gray-600">Add Resume Photo</span>
                  </div>
                </div>
                <Card style={{ width: 200, height: 300, marginRight: 50 }}>
                  <Title level={5}>Monthly</Title>
                  <div>
                    {Number(data?.vipMonthRatio).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </div>
                  <div>
                    <MonthSub money={data?.vipMonthRatio} />
                  </div>
                </Card>
                <Card style={{ width: 200, height: 300, marginRight: 50 }}>
                  <Title level={5}>Annualy</Title>
                  <div>
                    {Number(data?.vipYearRatio).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                    <div>
                      <MonthSub money={data?.vipYearRatio} />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
