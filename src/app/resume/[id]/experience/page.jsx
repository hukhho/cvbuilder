'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import ExperienceForm from '@/app/components/Form/ExperienceForm';

import './experience.css';

import ExperienceHeader from './ExperienceHeader';
import ExperienceList from './ExperienceList';
import SortCheckbox from './SortCheckbox';

import { deleteExperience, getAllExperiences } from './experienceService';

const { Meta } = Card;

const Experience = ({ params }) => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);

  console.log('Experiences: ', params);

  const cvId = params.id;

  const fetchExperiences = async () => {
    try {
      const data = await getAllExperiences(cvId);
      console.log('data getAllExperiences ', data);
      setExperiences(data);
    } catch (error) {
      console.error('There was an error fetching the experiences', error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleEditExperience = experience => {
    setSelectedExperience(experience);
  };
  const handleDeleteExperience = async experienceId => {
    try {
      console.log('deleteExperience id ', experienceId);

      await deleteExperience(cvId, experienceId);

      // Refresh the experiences list after deletion
      const updatedExperiences = await getAllExperiences(cvId);

      setExperiences(updatedExperiences);
    } catch (error) {
      console.error('There was an error deleting the experience', error);
    }
  };
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
                    <ExperienceHeader />
                    <ExperienceList experiences={experiences} onDeleteExperience={handleDeleteExperience} onEditExperience={handleEditExperience} />
                    <SortCheckbox checked={sortByDate} onChange={handleSortChange} />
                  </div>
                </div>
              </div>

              <div className="w-2/3  flex flex-col items-start">
                <ExperienceForm cvId={cvId} onExperienceCreated={fetchExperiences} experience={selectedExperience} />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Experience;
