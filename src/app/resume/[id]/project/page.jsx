'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import ProjectForm from '@/app/components/Form/ProjectForm';

import './experience.css';
import ProjectHeader from './ProjectHeader';
import ProjectList from './ProjectList';

const { Meta } = Card;

const Project = () => {
  const projects = [
    { title: '1st Runner-up RE Hackathon', company: '' },
    { title: 'Champion Debate Tournament FPT University', company: '' },
    { title: 'Add your first Project', company: '' },
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
                  <ProjectHeader />
                  <ProjectList projects={projects} />
                </div>
              </div>

              <div className="w-2/3  flex flex-col items-start">
                <ProjectForm />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Project;
