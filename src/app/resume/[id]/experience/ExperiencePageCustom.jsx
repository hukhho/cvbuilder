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
import { fieldConfig } from '../sectionConfig';
import StandarListV2 from '@/app/components/List/StandarListV2';
import CustomSections from '@/app/components/Templates/SectionComponents/CustomSection';
import SectionForm from '../SectionForm';
import CustomForm from '@/app/components/Form/CustomForm';
import { getFinishUp, saveCv } from '../finishup/finishUpService';

const { Meta } = Card;

const ExperiencePageCustom = ({
  params,
  sectionTypeName,
  titleHeader,
  enabledCategories,
  videoUrl,
}) => {
  // const sectionTypeName = 'experiences';

  const router = useRouter();
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [finishUpData, setFinishUpData] = useState();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const dataService = new DataService(sectionTypeName, params.id);

  const field = fieldConfig[sectionTypeName];

  const { avatar, email, userRole } = useStore();
  // const enabledCategories = { EXPERIENCE: true };

  const cvId = params.id;
  const searchParams = useSearchParams();
  const typeId = searchParams.get('typeId');
  const handleRemoveSearchParam = () => {
    console.log('handleRemoveSearchParam');
    if (sectionTypeName === 'experiences') {
      router.replace(`/resume/${cvId}/experience`, undefined, { shallow: true });
    }
  };

  const createExperience = async (values) => {
    console.log('createExperience: ', values);
    try {
      setIsDnd(false);
      const type = sectionTypeName;
      const sectionIndex = parseInt(type.replace('customSection', ''), 10) - 1;
      if (!isNaN(sectionIndex) && finishUpData?.customSections[sectionIndex]?.sectionData) {
        const updatedCustomSections = [...finishUpData.customSections[sectionIndex].sectionData];
        console.log('updatedCustomSections', updatedCustomSections);

        // updatedCustomSections.forEach((section, index) => {
        //   // section.id = index + 1;
        //   section.id = index + 1;
        //   section.isDisplay = true;
        //   section.theOrder = index + 1;
        //   // section.sectionData.forEach((item, index2) => {
        //   //   item.id = index2 + 1;
        //   //   item.isDisplay = true;
        //   //   item.theOrder = index2 + 1;
        //   // });
        // });
        
        // values.id = updatedCustomSections.length + 1;
        values.id = new Date().getTime();
        values.isDisplay = true;
        values.theOrder = updatedCustomSections.length + 1;

        updatedCustomSections.push(values);
        console.log('updatedCustomSections', updatedCustomSections);
        
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.customSections[sectionIndex].sectionData = updatedCustomSections;

        setFinishUpData(newFinishUpData);

        await saveCv(cvId, newFinishUpData);
        // await dataService.create(experience);
        // const updatedExperiences = await dataService.getAll();
        // setExperiences(updatedExperiences);
      }
    } catch (error) {
      console.error('There was an error creating the experience', error);
    } finally {
      setIsDnd(true);
      fetchExperiences();
    }
  };

  const updateExperience = async (id, newExperience) => {
    try {
      setIsDnd(false);
      console.log('updateExperience123');
      const type = sectionTypeName;
      const sectionIndex = parseInt(type.replace('customSection', ''), 10) - 1;
      if (!isNaN(sectionIndex) && finishUpData?.customSections[sectionIndex]?.sectionData) {
        const updatedCustomSections = finishUpData.customSections[sectionIndex].sectionData.map(
          item => {
            if (item.id === id) {
              return newExperience;
            } else {
              return item;
            }
          },
        );
        console.log('updatedCustomSections', updatedCustomSections);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.customSections[sectionIndex].sectionData = updatedCustomSections;
        setFinishUpData(newFinishUpData);

        await saveCv(cvId, newFinishUpData);
        // await dataService.update(id, experience);
        // const updatedExperiences = await dataService.getAll();
        // setExperiences(updatedExperiences);
        setSelectedExperience(null);
      }
    } catch (error) {
      console.error('There was an error updating the experience', error);
    } finally {
      setIsDnd(true);
      fetchExperiences();

    }
  };

  const fetchExperiences = async () => {
    try {
      setIsDnd(false);
      // const data = await getAllExperiences(cvId);
      // const data = await dataService.getAll();
      const fetchedData = await getFinishUp(params.id);
      setFinishUpData(fetchedData);

      const index = parseInt(sectionTypeName.replace('customSection', ''), 10) - 1;

      const data = fetchedData.customSections[index].sectionData;

      data.sort((a, b) => a.theOrder - b.theOrder);

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
    // fetchExperiences();
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
        setIsDnd(false);
        console.log('deleteExperience id ', experienceId);
        // await deleteExperience(cvId, experienceId);
        const type = sectionTypeName;
        const sectionIndex = parseInt(type.replace('customSection', ''), 10) - 1;
        if (!isNaN(sectionIndex) && finishUpData?.customSections[sectionIndex]?.sectionData) {
          const updatedCustomSections = finishUpData.customSections[sectionIndex].sectionData.filter(
            item => item.id !== experienceId,
          );
          console.log('updatedCustomSections', updatedCustomSections);
          let newFinishUpData = { ...finishUpData };
          newFinishUpData.customSections[sectionIndex].sectionData = updatedCustomSections;
          setFinishUpData(newFinishUpData);
          await saveCv(cvId, newFinishUpData);
          // const updatedExperiences = await dataService.getAll();
          // setExperiences(updatedExperiences);
          setSelectedExperience(null);
        }
      } catch (error) {
        console.error('There was an error deleting the experience', error);
      } finally {
        setIsDnd(true);
        fetchExperiences()
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
      const type = sectionTypeName;
      const sectionIndex = parseInt(type.replace('customSection', ''), 10) - 1;

      if (!isNaN(sectionIndex) && finishUpData?.customSections[sectionIndex]?.sectionData) {
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.customSections[sectionIndex].sectionData = updatedOrder;
        setFinishUpData(newFinishUpData);
        await saveCv(cvId, newFinishUpData);
      }

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
      fetchExperiences();
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
            <UserCVBuilderHeader sectionTypeName={sectionTypeName} initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex w-full">
              <div
                className="flex flex-col p-4 pl-0"
                style={{ width: '320px', marginRight: '36px' }}
              >
                <div style={{ height: '185px', width: '320px' }}>
                  <div style={{ maxHeight: '185px' }}>
                    <VideoComponent videoUrl={videoUrl} />
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
                      {/* Your Experiences */}
                      {titleHeader}
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
                    {isShow &&
                      selectedExperience &&
                      (sectionTypeName === 'experiences' ||
                        sectionTypeName === 'projects' ||
                        sectionTypeName === 'involvements') && (
                        <ListError errors={selectedExperience?.bulletPointDtos} />
                      )}
                  </div>

                  <div style={{ paddingTop: '0px' }}>
                    {isLoadingPage && <Skeleton className="mt-10" active />}
                    {!isLoadingPage && !errorMessage && experiences?.length === 0 && (
                      <div className="mt-10">Add your first items</div>
                    )}
                    {!isLoadingPage && errorMessage && (
                      <Alert
                        className="mt-10"
                        message="Error"
                        description={errorMessage}
                        type="error"
                      />
                    )}
                    {isShow &&
                      !isDnd &&
                      !isLoadingPage &&
                      experiences?.length > 0 &&
                      experiences?.map(experience => (
                        <StandarListV2
                          key={experience.id}
                          data={experience}
                          selectedExperience={selectedExperience}
                          cvId={cvId}
                          onDelete={handleDeleteExperience}
                          onEdit={handleEditExperience}
                          // title={experience.role}
                          // subtitle={experience.companyName}
                          updateExperience={updateExperience}
                          config={{
                            titleField: 'title',
                            subtitleField: 'subTitle',
                          }} // Pass the configuration object
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
                        config={{
                          titleField: 'title',
                          subtitleField: 'subTitle',
                        }} // Pass the configuration object
                      />
                    )}
                  </div>
                </Card>
              </div>
              <div className="flex flex-col px-4 w-full">
                {!isLoadingPage ? (
                  <CustomForm
                    cvId={cvId}
                    createExperience={createExperience}
                    updateExperience={updateExperience}
                    onExperienceCreated={onUpdateExperience}
                    experience={selectedExperience}
                  />
                ) : (
                  <CustomForm
                    cvId={cvId}
                    onExperienceCreated={onUpdateExperience}
                    experience={null}
                  />
                )}

                {/* {!isLoadingPage ? (
                  <SectionForm
                    cvId={cvId}
                    onExperienceCreated={onUpdateExperience}
                    experience={selectedExperience}
                    sectionType={sectionTypeName}
                  />
                ) : (
                  <SectionForm
                    cvId={cvId}
                    onExperienceCreated={onUpdateExperience}
                    experience={null}
                    sectionType={sectionTypeName}
                  />
                )} */}
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default ExperiencePageCustom;
