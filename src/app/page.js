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
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from './components/Button/LoginButton';
import Login from './login/page';
import { PageLoader } from './components/PageLoader';

const Home = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  if (isAuthenticated) {
    return <ResumeIndex />;
  }
  return <Login />;
};

export default Home;
