/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Space } from 'antd';
import dynamic from 'next/dynamic';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import ExperienceForm from '@/app/components/Form/ExperienceForm';
import VideoComponent from '@/app/components/VideoComponent';

import SortCheckbox from './SortCheckbox';
import ExperienceList from './ExperienceList';
import { deleteExperience, getAllExperiences, updateExperience } from './experienceService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ListError from '@/app/components/ListError/ListError';
import Head from 'next/head';
import StandarList from '../../../components/List/StandarList';
import { useRouter, useSearchParams } from 'next/navigation';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';

const { Meta } = Card;

const Experience = ({ params }) => {
  const router = useRouter();
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const { avatar, email, userRole } = useStore();
  const enabledCategories = { EXPERIENCE: true };
  console.log('Experiences: ', params);

  const cvId = params.id;

  const searchParams = useSearchParams();
  const typeId = searchParams.get('typeId');
  const handleRemoveSearchParam = () => {
    console.log("handleRemoveSearchParam")
    router.replace(`/resume/${cvId}/experience`, undefined, { shallow: true });
  };
  const fetchExperiences = async () => {
    try {
      const data = await getAllExperiences(cvId);
      console.log('data getAllExperiences ', data);
      // setSelectedExperience(null);

      if (typeId > 0) {
        console.log('typeId: ', typeId);
        let experience = data.find(item => item.id == typeId);
        console.log('experience::typeId ', experience);
        setSelectedExperience(experience);
      }

      setExperiences(data);
    } catch (error) {
      console.error('There was an error fetching the experiences', error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleEditExperience = experience => {
    handleRemoveSearchParam();

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

  // const Video = dynamic(() => import('../../../components/VideoComponent'), {
  //   ssr: true,
  // });

  const [isShow, setIsShow] = useState(true);
  const handleDownButton = () => {
    setIsShow(!isShow);
  };
  console.log('experiences: ', experiences);
  console.log('experiences.bulletPointDtos: ', experiences.bulletPointDtos);

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
            <div className="flex w-full">
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
                      Your Experiences
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
                    {isShow && selectedExperience && (
                      <ListError errors={selectedExperience?.bulletPointDtos} />
                    )}
                  </div>

                  <div style={{ paddingTop: '0px' }}>
                    {isShow &&
                      experiences.map(experience => (
                        <StandarList
                          key={experience.id}
                          data={experience}
                          selectedExperience={selectedExperience}
                          cvId={cvId}
                          onDelete={handleDeleteExperience}
                          onEdit={handleEditExperience}
                          title={experience.role}
                          subtitle={experience.companyName}
                          updateExperience={updateExperience}
                        />
                      ))}
                  </div>
                </Card>
              </div>
              <div className="flex flex-col px-4">
                <ExperienceForm
                  cvId={cvId}
                  onExperienceCreated={fetchExperiences}
                  experience={selectedExperience}
                />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Experience;
