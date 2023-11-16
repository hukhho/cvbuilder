/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
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

import { CalendarOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import UserHeaderJob from '@/app/components/UserHeaderJob';
import Image from 'next/image';

const { Title } = Typography;

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    OPPORTUNITIES: true,
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

  return (
    <body className="pro-ui">
      <main>
        <ConfigProvider>
          <UserLayout
            selected="3"
            userHeader={<UserHeaderJob initialEnabledCategories={enabledCategories} />}
            content={
              <div className="container">
                <div className="!p-0 mb-5 mt-0 card">
                  <div style={{ textAlign: 'left' }} />

                  <div>
                    <div className="flex relative">
                      <Title level={3}>Product Specialist, Media</Title>
                      <div>
                        <div style={{ marginLeft: '500px', textAlign: 'left' }}>
                          <button className="button" style={{ width: '314px' }}>
                            Apply for this job
                          </button>
                          <div className="mt-4">
                            <HeartOutlined />
                            <span style={{ color: '#4D70EB', marginLeft: '10px' }}>Like</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <Title level={5} style={{ color: '#4D70EB' }}>
                        Zalo
                      </Title>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.48615 13.7175C0.702344 7.95788 0 7.36676 0 5.25C0 2.3505 2.23857 0 5 0C7.76143 0 10 2.3505 10 5.25C10 7.36676 9.29766 7.95788 5.51385 13.7175C5.26555 14.0942 4.73443 14.0941 4.48615 13.7175ZM5 7.4375C6.1506 7.4375 7.08333 6.45813 7.08333 5.25C7.08333 4.04187 6.1506 3.0625 5 3.0625C3.8494 3.0625 2.91667 4.04187 2.91667 5.25C2.91667 6.45813 3.8494 7.4375 5 7.4375Z"
                            fill="black"
                          />
                        </svg>
                        <span className="ml-2">District 7, Ho Chi Minh City</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0.666748V15.3334"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.3333 3.33325H6.33333C5.71449 3.33325 5.121 3.57908 4.68342 4.01667C4.24583 4.45425 4 5.04775 4 5.66659C4 6.28542 4.24583 6.87892 4.68342 7.3165C5.121 7.75409 5.71449 7.99992 6.33333 7.99992H9.66667C10.2855 7.99992 10.879 8.24575 11.3166 8.68334C11.7542 9.12092 12 9.71441 12 10.3333C12 10.9521 11.7542 11.5456 11.3166 11.9832C10.879 12.4208 10.2855 12.6666 9.66667 12.6666H4"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div>
                          <span className="ml-2">1,000 - 3,000 USD GROSS</span>
                        </div>
                      </div>

                      <div className="flex mt-4 space-x-4 items-center">
                        <div
                          style={{ width: '120px', textAlign: 'center' }}
                          className="border-gray-500 border rounded-full p-1"
                        >
                          Product Owner{' '}
                        </div>
                        <div
                          style={{ width: '120px', textAlign: 'center' }}
                          className="border-gray-500 border rounded-full p-1"
                        >
                          UI/UX Designer{' '}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-8">
                    <div className="p-8 bg-white" style={{ textAlign: 'left' }}>
                      <div>
                        <Title level={4}>What can we offer?</Title>
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>
                      </div>
                      <div className="mt-4">
                        <Title level={4}>What can we offer?</Title>
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>
                      </div>
                      <div className="mt-4">
                        <Title level={4}>What can we offer?</Title>
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>{' '}
                        <div>
                          • Competitive salary package with 13th salary, annual performance-based
                          bonus, and monthly lunch allowance
                        </div>
                      </div>
                    </div>
                    <div>
                      <Card
                        style={{
                          width: 300,
                          background: 'white',
                          borderRadius: '10px',
                          marginLeft: '20px',
                          textAlign: 'left',
                        }}
                      >
                        <div>
                          <div className="flex">
                            <CalendarOutlined />
                            <div className="flex flex-col ml-2">
                              <span style={{ fontWeight: 'bold' }}>Posted date</span>
                              <p>18/05/2022</p>
                            </div>
                          </div>
                          <div className="flex">
                            <CalendarOutlined />
                            <div className="flex flex-col ml-2">
                              <span style={{ fontWeight: 'bold' }}>Experience</span>
                              <p>3+ years</p>
                            </div>
                          </div>
                          <div className="flex">
                            <CalendarOutlined />
                            <div className="flex flex-col ml-2">
                              <span style={{ fontWeight: 'bold' }}>Job Type</span>
                              <p>Full time</p>
                            </div>
                          </div>
                          <div className="flex">
                            <CalendarOutlined />
                            <div className="flex flex-col ml-2">
                              <span style={{ fontWeight: 'bold' }}>Preferred Languages</span>
                              <p>English</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <button className="button" style={{ marginTop: '20px', width: '314px' }}>
                    Apply for this job
                  </button>
                </div>
              </div>
            }
          />
        </ConfigProvider>
      </main>
    </body>
  );
};

export default Home;
