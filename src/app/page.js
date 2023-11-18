'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, notification } from 'antd';
import UserLayout from './components/Layout/UserLayout';
import UserHeader from './components/UserHeader';
import CVCard from './components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation
import { getResumes } from './utils/indexService';
import { RadiusBottomrightOutlined } from '@ant-design/icons';
import ResumeIndex from './resume/page';

const Home = () => {
  return <ResumeIndex />;
};

export default Home;
