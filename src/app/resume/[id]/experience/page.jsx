/* eslint-disable import/no-unresolved */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';
import dynamic from 'next/dynamic';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import ExperienceForm from '@/app/components/Form/ExperienceForm';
import VideoComponent from '@/app/components/VideoComponent';

import SortCheckbox from './SortCheckbox';
import ExperienceList from './ExperienceList';
import { deleteExperience, getAllExperiences } from './experienceService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const { Meta } = Card;

const Experience = ({ params }) => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    EXPERIENCE: true,
  });
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

  // const Video = dynamic(() => import('../../../components/VideoComponent'), {
  //   ssr: true,
  // });

  const [isShow, setIsShow] = useState(true);
  const handleDownButton = () => {
    setIsShow(!isShow);
  };

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex h-screen ">
              <div className="flex flex-col p-4">
                <div className="h-1/3">
                  <div className="">
                    <VideoComponent />
                  </div>
                  {/* <Image
                        src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                        width={320}
                        height={182}
                        alt="Video"
                      /> */}
                </div>
                <div className="h-3/4">
                  <div>
                    <div className=" p-[27px] bg-white rounded-[9px] shadow flex-col justify-start items-start gap-[17px] inline-flex">
                      <div className="w-[266px] h-[50.50px] flex border-b border-gray-300">
                        <div className="left-0 top-[1.47px] text-slate-700 text-lg font-bold font-['Source Sans Pro'] leading-7">
                          Your Experiences
                        </div>

                        <div className="text-gray-300 p-2 align-middle cursor-pointer leading-3 outline-0 ">
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className={isShow ? 'transform -rotate-90' : 'transform rotate-0'}
                            id="react-collapsed-toggle-:r0:"
                            aria-controls="react-collapsed-panel-:r0:"
                            aria-expanded="true"
                            role="button"
                            tabIndex={0}
                            aria-hidden
                            onClick={handleDownButton}
                          />{' '}
                        </div>
                      </div>
                      {isShow &&
                        experiences.map(experience => (
                          <ExperienceList
                            key={experience.id}
                            data={experience}
                            onDelete={handleDeleteExperience}
                            onEdit={handleEditExperience}
                          />
                        ))}
                      <div className="w-[266px] pl-[63.27px] pr-[64.73px] pt-[12.86px] pb-[13.19px] bg-indigo-500 rounded-md justify-center items-center inline-flex">
                        <div className="text-center text-white text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
                          Create new education
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
