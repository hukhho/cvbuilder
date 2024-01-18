'use client';

import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider, Divider, Empty, Space } from 'antd';
import { Popover, Switch } from '@headlessui/react';
import UserLayout from '../components/Layout/UserLayout';
import UserHeader from '../components/UserHeader';
import CVCard from '../components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation
import { getResumes } from '../utils/indexService';
import FinishUpPreview from './[id]/finishup/FinishUpPreview';
import Meta from 'antd/es/card/Meta';
import './namebadge.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faCogs,
  faCopy,
  faEdit,
  faEllipsisV,
  faSearch,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import ResumeCard from './ResumeCard';
import useStore from '@/store/store';

const ResumeIndex = () => {
  const [resumes, setResumes] = useState([]);
  const [enabledCategories, setEnabledCategories] = useState({
    RESUMES: true,
  });
  const { avatar, email, userRole, refreshResumes } = useStore();
  // const { resumes, , finishUpData, refreshFinishUpData } = useStore();

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
    console.log('avatar: ', avatar);
    console.log('userRole: ', userRole);

    if (!resumes.length) {
      fetchResumes();
    }
  }, []);

  const onCreated = () => {
    console.log('onCreated hihi');
    fetchResumes();
    refreshResumes();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'red',
          borderRadius: '6px',
          colorBgContainer: '#fbfbfb',
        },
      }}
    >
      <UserLayout
        onCreated={onCreated}
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="1"
        userHeader={<UserHeader initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {resumes?.map((item, index) => (
                <div key={index}>
                  <ResumeCard resume={item} onDeleted={onCreated} />
                </div>
              ))}
              {resumes?.length === 0 && <Empty />}
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default ResumeIndex;
