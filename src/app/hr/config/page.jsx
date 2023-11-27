/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, ConfigProvider, Form, Input, Select, Table, Typography } from 'antd';
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
import { getHrConfig } from '../hrServices';

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW HISTORY': true,
  });
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [resumes, setResumes] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getHrConfig();
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
                  <HrForm data={data} onCreated={onCreated} />
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
