'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';
import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import EducationForm from '@/app/components/Form/EducationForm';

import './education.css';
import EducationHeader from './EducationHeader';
import EducationList from './EducationList';
import { deleteEducation, getAllEducations } from './educationService';

const { Meta } = Card;

const Education = ({ params }) => {
  const [educations, setEducations] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);

  console.log('Education: ', params);
  const cvId = params.id;

  const fetchEducations = async () => {
    try {
      const data = await getAllEducations(cvId);
      console.log('data getAllEducations ', data);
      setEducations(data);
    } catch (error) {
      console.error('There was an error fetching the educations', error);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleEditEducation = education => {
    setSelectedEducation(education);
  };
  const handleDeleteEducation = async educationId => {
    try {
      console.log('deleteEducation id ', educationId);

      await deleteEducation(cvId, educationId);

      // Refresh the educations list after deletion
      const updatedEducations = await getAllEducations(cvId);

      setEducations(updatedEducations);
    } catch (error) {
      console.error('There was an error deleting the education', error);
    }
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

                <div className="w-3/4 h-3/4 border-2 border-gray-200 rounded-lg p-4">
                  <div className="container">
                    <EducationHeader />
                    <EducationList
                      educations={educations}
                      onDeleteEducation={handleDeleteEducation}
                      onEditEducation={handleEditEducation}
                    />
                  </div>
                </div>
              </div>
              <div className="w-2/3  flex flex-col items-start">
                <EducationForm
                  cvId={cvId}
                  onEducationCreated={fetchEducations}
                  education={selectedEducation}
                />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Education;
