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
import Login from './login/page';
import { PageLoader } from './components/PageLoader';
import useStore from '@/store/store';
import Dashboard from './admin/dashboard/page';
import ExpertRequestPage from './expert/requests/page';
import HRApplicationPage from './hr/application/page';

const Home = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();
  const { userRole } = useStore();

  if (isLoading) {
    return <PageLoader />;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    if (userRole === 'ADMIN') {
      return <Dashboard />;
    }
    if (userRole === 'CANDIDATE') {
      return <ResumeIndex />;
    }
    if (userRole === 'EXPERT') {
      return <ExpertRequestPage />;
    }
    if (userRole === 'HR') {
      return <HRApplicationPage />;
    }
    return <Login />;
  }
  return <Login />;
};

export default Home;
