/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
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

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW HISTORY': true,
  });
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [resumes, setResumes] = useState([]);

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
    console.log('onCreated');
  };

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        userHeader={<></>}
        // userHeader={<UserHeaderExpert initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0 mb-5 mt-16 card">
              <div style={{ textAlign: 'left' }}>
                {/* <Title level={5}>CV Review Table</Title> */}
              </div>
              <div></div>
              <div>
                <div>
                  <ExpertForm data={data} onCreated={onCreated} resumeOptions={resumeOptions} />
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
