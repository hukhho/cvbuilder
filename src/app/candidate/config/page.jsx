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
import { getCandidateConfig } from '../candidateServices';
import CandidateForm from '@/app/components/Form/CandidateForm';
import { getProtectedResource } from '@/app/services/message.service';
import Deposit from '@/app/components/Modal/Deposit';
import CandidateConfigHeader from '@/app/components/CandidateConfigHeader';
import useStore from '@/store/store';
// import { getHrConfig } from '../hrServices';

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    ACCOUNT: true,
  });
  const { avatar, email, userRole } = useStore();

  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [protectedData, setProtectedData] = useState();

  const [resumes, setResumes] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getCandidateConfig();
      console.log('fetchedDataFromAPI: ', fetchedDataFromAPI);

      setData(fetchedDataFromAPI);
      form.setFieldsValue(fetchedDataFromAPI);

      const fetchProtected = await getProtectedResource();
      console.log('fetchProtected: ', fetchProtected);
      setProtectedData(fetchProtected);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };
  // const fetchResumes = async () => {
  //   try {
  //     // Simulate fetching resumes (replace with your actual fetch logic)
  //     const fetchedResumes = await getResumes();
  //     setResumes(fetchedResumes);
  //   } catch (error) {
  //     console.error('There was an error fetching resumes', error);
  //   }
  // };

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

  const formatBalance = balance => {
    if (balance !== undefined) {
      // Convert to VND and format
      const formattedBalance = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(balance * 1000);

      return formattedBalance;
    }

    return ''; // Return an empty string if balance is undefined
  };

  return (
    <ConfigProvider>
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="7"
        userHeader={<CandidateConfigHeader initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0 mb-5 mt-16">
              <div style={{ textAlign: 'left' }}>
              </div>
              <div></div>
              <div>
                <div>
                  <CandidateForm data={data} onCreated={onCreated} />
                </div>
                <div>
                  <Card className="mt-16" style={{ width: '700px' }}>
                    Your Balance: <b>{formatBalance(protectedData?.data?.accountBalance)}</b>
                    <Deposit />
                  </Card>
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
