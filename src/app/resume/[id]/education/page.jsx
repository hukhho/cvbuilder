/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import EducationForm from '@/app/components/Form/EducationForm';

import { deleteEducation, getAllEducations } from './educationService';
import EducationList from './EducationList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const { Meta } = Card;

const Education = ({ params }) => {
  const [educations, setEducations] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    EDUCATION: true,
  });
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
        <UserCVBuilderLayout
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex h-screen ">
              <div className="flex flex-col p-4">
                <div className="h-1/3">
                  <p>
                    <Image
                      src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                      width={320}
                      height={182}
                      alt="Video"
                    />
                  </p>
                </div>
                <div className="h-3/4">
                  <div>
                    <div className=" p-[27px] bg-white rounded-[9px] shadow flex-col justify-start items-start gap-[17px] inline-flex">
                      <div className="w-[266px] h-[50.50px] relative border-b border-gray-300">
                        <div className="left-0 top-[1.47px] absolute text-slate-700 text-lg font-bold font-['Source Sans Pro'] leading-7">
                          Your Education
                        </div>
                        <div className="text-gray-300 p-2 align-middle cursor-pointer leading-3 outline-0 ml-8">
                          <button>
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              className={isShow ? 'transform -rotate-90' : 'transform rotate-0'}
                              onClick={handleDownButton}
                            />
                          </button>
                        </div>
                      </div>
                      {educations.map(education => (
                        <EducationList
                          key={education.id}
                          education={education}
                          onDeleteEducation={handleDeleteEducation}
                          onEditEducation={handleEditEducation}
                          onHideEducation={handleHideEducation}
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
