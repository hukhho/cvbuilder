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

import { getCoverLetters, getResumes } from '@/app/utils/indexService';

import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getExpertConfig, getRequestList, updateExpertConfig } from '../expertServices';
import UserHeaderExpert from '@/app/components/UserHeaderExpert';
import ExpertForm from '@/app/components/Form/ExpertForm';
import ExpertConfigHeader from '@/app/components/ExpertConfigHeader';
import Deposit from '@/app/components/Modal/Deposit';
import { getProtectedResource } from '@/app/services/message.service';
import Withdraw from '@/app/components/Modal/Withdraw';
import useStore from '@/store/store';
import BankExpertForm from '@/app/components/Form/BankExpertForm';

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    ACCOUNT: true,
  });
  const { avatar, email, userRole, balance, refreshBalance } = useStore();

  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [resumes, setResumes] = useState([]);
  const [protectedData, setProtectedData] = useState();

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getExpertConfig();
      console.log('fetchedDataFromAPI: ', fetchedDataFromAPI);

      setData(fetchedDataFromAPI);
      form.setFieldsValue(fetchedDataFromAPI);

      
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };
  const fetchResumes = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedResumes = await getResumes();
      setResumes(fetchedResumes);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
    fetchResumes();
  }, []);

  const resumeOptions = resumes.map(resume => ({
    value: resume.id,
    label: resume.resumeName,
  }));

  const onFinish = async values => {
    console.log('values: ', values);
    const result = await updateExpertConfig(values.cv, values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onCreated = () => {
    // form.setFieldsValue({
    //   //   note: 'Hello world!',
    //   //   gender: 'male',
    // });
    fetchData()
    console.log('onCreated');
  };

  const formatBalance = balance => {
    if (balance !== undefined) {
      // Convert to VND and format
      const formattedBalance = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(balance);

      return formattedBalance;
    }

    return ''; // Return an empty string if balance is undefined
  };


  return (
      <UserLayout
        selected="5"
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        userHeader={<ExpertConfigHeader initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0 mb-5 mt-16">
              <div style={{ textAlign: 'left' }}>
                {/* <Title level={5}>CV Review Table</Title> */}
              </div>
              <div></div>
              <div>
                <div>
                  <ExpertForm data={data} onCreated={onCreated} resumeOptions={resumeOptions} />
                </div>
                <div>
                  <BankExpertForm data={data} onCreated={onCreated} />
                </div>
                <div>
                  {' '}
                  <Card className="mt-16" style={{ width: '700px' }}>
                    Your Balance: <b>{formatBalance(balance)}</b>
                    <Withdraw onCreated={onCreated}/>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        }
      />
  );
};

export default Home;
