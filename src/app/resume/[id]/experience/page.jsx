/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Alert, Button, Card, ConfigProvider, Skeleton, Space, notification } from 'antd';
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
import ExperienceSort from './ExperienceSort';
import DataService from '../../../utils/dataService';

const { Meta } = Card;

const Experience = ({ params }) => {
  const router = useRouter();
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dataService = new DataService('experiences', params.id);

  const { avatar, email, userRole } = useStore();
  const enabledCategories = { EXPERIENCE: true };
  console.log('Experiences: ', params);

  const cvId = params.id;

  const searchParams = useSearchParams();
  const typeId = searchParams.get('typeId');
  const handleRemoveSearchParam = () => {
    console.log('handleRemoveSearchParam');
    router.replace(`/resume/${cvId}/experience`, undefined, { shallow: true });
  };
  const fetchExperiences = async () => {
    try {
      setIsDnd(false);

      const data = await getAllExperiences(cvId);
      console.log('data getAllExperiences ', data);

      if (typeId > 0) {
        console.log('typeId: ', typeId);
        let experience = data.find(item => item.id == typeId);
        console.log('experience::typeId ', experience);
        setSelectedExperience(experience);
      } else {
        setSelectedExperience(null);
      }
      console.log('setExperiences ', data);
      data.sort((a, b) => a.theOrder - b.theOrder);
      setExperiences(data);
      
    } catch (error) {
      console.error('There was an error fetching the experiences', error);
      setErrorMessage('There was an error fetching the experiences');
    } finally {
      setIsLoadingPage(false);
      setIsDnd(true);
    }
  };
  const onUpdateExperience = async () => {
    console.log('onUpdateExperience');
    fetchExperiences();
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleEditExperience = experience => {
    handleRemoveSearchParam();
    setSelectedExperience(experience);
    setIsDnd(false);
  };
  const handleDeleteExperience = async experienceId => {
    try {
      console.log('deleteExperience id ', experienceId);
      setIsDnd(false);

      await deleteExperience(cvId, experienceId);

      // Refresh the experiences list after deletion
      const updatedExperiences = await getAllExperiences(cvId);

      setExperiences(updatedExperiences);
    } catch (error) {
      console.error('There was an error deleting the experience', error);
    } finally {
      setIsDnd(true);
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
  const [isDnd, setIsDnd] = useState(false);

  const handleDownButton = () => {
    setIsShow(!isShow);
  };
  console.log('experiences: ', experiences);
  console.log('experiences.bulletPointDtos: ', experiences.bulletPointDtos);

  // if (isLoadingPage)
  // {
  //   return (<div>Loading...</div>)
  // }
  const handleOrderChange = async newOrder => {
    // Create a new JSON with updated "theOrder" property
    const updatedOrder = newOrder.map((item, index) => ({
      ...item,
      theOrder: index + 1,
    }));
    console.log('updatedOrder', updatedOrder);
    setIsDnd(false);
    setExperiences(updatedOrder);
    try {
      await dataService.sortOrder(updatedOrder);
      notification.success({
        message: 'Save changed',
      });
    } catch (error) {
      notification.error({
        message: 'Save order error',
      });
      console.error('There was an error updating the data', error);
    } finally {
      setIsDnd(true);
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
            <div className="flex w-full">
              <div
                className="flex flex-col p-4 pl-0"
                style={{ width: '320px', marginRight: '36px' }}
              >
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
                    {isLoadingPage && <Skeleton className="mt-10" active />}
                    {!isLoadingPage && !errorMessage && experiences?.length === 0 && (
                      <div className='mt-10'>Add your first experiences</div>
                    )}
                    {!isLoadingPage && errorMessage && (
                      <Alert className='mt-10' message="Error" description={errorMessage} type="error" />
                    )}

                    {isShow &&
                      !isDnd &&
                      !isLoadingPage &&
                      experiences?.length > 0 &&
                      experiences?.map(experience => (
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

                    {isShow && isDnd && !isLoadingPage && experiences?.length > 0 && (
                      <ExperienceSort
                        cvId={cvId}
                        selectedExperience={selectedExperience}
                        onEdit={handleEditExperience}
                        updateExperience={updateExperience}
                        handleDeleteData={handleDeleteExperience}
                        handleEditData={handleEditExperience}
                        skills={experiences}
                        onChangeOrder={handleOrderChange}
                      />
                    )}
                  </div>
                </Card>
              </div>
              <div className="flex flex-col px-4 w-full">
                {!isLoadingPage ? (
                  <ExperienceForm
                    cvId={cvId}
                    onExperienceCreated={onUpdateExperience}
                    experience={selectedExperience}
                  />
                ) : (
                  <ExperienceForm
                    cvId={cvId}
                    onExperienceCreated={onUpdateExperience}
                    experience={null}
                  />
                )}
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Experience;
