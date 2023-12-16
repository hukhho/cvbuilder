/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Space } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import EducationForm from '@/app/components/Form/EducationForm';

import { deleteEducation, getAllEducations, updateEducation } from './educationService';
import EducationList from './EducationList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ListError from '@/app/components/ListError/ListError';
import StandarList from '@/app/components/List/StandarList';
import VideoComponent from '@/app/components/VideoComponent';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';

const { Meta } = Card;

const Education = ({ params }) => {
  const [educations, setEducations] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const { avatar, email, userRole } = useStore();
  const enabledCategories = { EDUCATION: true };
  const [isShow, setIsShow] = useState(true);
  const handleDownButton = () => {
    setIsShow(!isShow);
  };
  console.log('Education: ', params);
  const cvId = params.id;

  const fetchEducations = async () => {
    try {
      const data = await getAllEducations(cvId);
      console.log('data getAllEducations ', data);
      setSelectedEducation(null);
      setEducations(data);
    } catch (error) {
      console.error('There was an error fetching the educations', error);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleEditEducation = education => {
    console.log('selected: ', selectedEducation);
    setSelectedEducation(education);
  };
  const handleHideEducation = education => {
    console.log('Hide education: ', education);
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
        <UserLayout
          isCollapsed={true}
          avatar={avatar}
          email={email}
          userRole={userRole}
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex h-screen w-full">
              <div className="flex flex-col p-4" style={{ width: '320px', marginRight: '36px' }}>
                <div style={{ height: '185px', width: '320px' }}>
                  <div style={{ maxHeight: '185px' }}>
                    <VideoComponent />
                  </div>
                </div>
                <Card
                  style={{
                    width: '320px',
                    marginTop: '16px',
                    textAlign: 'left',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <span className="flex block pb-3 text-md font-bold border-b border-gray-300 list-shown-true">
                    <Space align="center">
                      Your Educations
                      <div className="text-gray-300 align-middle cursor-pointer leading-3 outline-0 ">
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className={isShow ? 'transform -rotate-90' : 'transform rotate-0'}
                          onClick={handleDownButton}
                        />
                      </div>
                    </Space>
                  </span>
                  <div>
                    {/* {isShow && selectedEducation && <ListError errors={selectedEducation?.bulletPointDtos} />} */}
                  </div>

                  <div style={{ paddingTop: '0px' }}>
                    {isShow &&
                      educations.map(project => (
                        <StandarList
                          key={project.id}
                          data={project}
                          selectedExperience={selectedEducation}
                          cvId={cvId}
                          onDelete={handleDeleteEducation}
                          onEdit={handleEditEducation}
                          title={project.degree}
                          subtitle={''}
                          updateExperience={updateEducation}
                        />
                      ))}
                  </div>
                </Card>
              </div>
              <div className="flex flex-col px-4">
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
