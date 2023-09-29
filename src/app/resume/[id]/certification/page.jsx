'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import CertificationForm from '@/app/components/Form/CertificationForm';

import './experience.css';

import CertificationHeader from './CertificationHeader';
import CertificationList from './CertificationList';
import SortCheckbox from '../experience/SortCheckbox';

const { Meta } = Card;

const Certification = () => {
  const certifications = [
    { title: 'Data Science Analyst in Codecademy', company: '' },
    { title: '1st Runner-up RE Hackathon', company: '' },
    { title: 'Champion Debate Tournament FPT University', company: '' },
  ];

  const [sortByDate, setSortByDate] = useState(true);

  const handleSortChange = () => {
    setSortByDate(!sortByDate);
    // You can implement your sorting logic here
  };

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={<UserCVBuilderHeader />}
          content={
            <div className="flex h-screen">
              <div className="w-1/3  flex flex-col justify-center items-center">
                <div className="h-1/3">
                  <p>
                    <a href="https://app.rezi.ai/dashboard/resume/jnB6pSiIUsbkyJXK4HG8/experience?wvideo=fo7dvqzmxu">
                      <img
                        src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                        width="400"
                        height="225"
                        style={{ width: '400px', height: '225px' }}
                        alt="Video Thumbnail"
                      />
                    </a>
                  </p>
                </div>

                <div className="h-2/3 border-2 border-gray-200 rounded-lg p-4">
                  <div className="container">
                    <CertificationHeader />
                    <CertificationList certifications={certifications} />
                    <SortCheckbox checked={sortByDate} onChange={handleSortChange} />
                  </div>
                </div>
              </div>

              <div className="w-2/3  flex flex-col items-start">
                <CertificationForm />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Certification;
