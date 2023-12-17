'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Space } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

import CertificationForm from '@/app/components/Form/CertificationForm';

import SortCheckbox from './SortCheckbox';
import SkillList from './SkillList';
import DataService from '../../../utils/dataService';
import SkillsForm from '@/app/components/Form/SkillForm';
import VideoComponent from '@/app/components/VideoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StandarList from '@/app/components/List/StandarList';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { updateSkills } from './skillService';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';

const { Meta } = Card;

const Skill = ({ params }) => {
  const [skillsData, setSkillsData] = useState([]); // Renamed 'data' to 'skillsData'
  const [selectedData, setSelectedData] = useState(null);

  const { avatar, email, userRole } = useStore();
  const enabledCategories = { SKILLS: true };
  console.log('Data: ', params);

  const cvId = params.id;
  const dataService = new DataService('skills', cvId);
  const [isShow, setIsShow] = useState(true);
  const handleDownButton = () => {
    setIsShow(!isShow);
  };
  const fetchData = async () => {
    try {
      const data = await dataService.getAll();
      console.log('fetchData ', data);
      setSelectedData(null);
      setSkillsData(data); // Updated to set 'skillsData'
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditData = item => {
    // Renamed the parameter to "item"
    setSelectedData(item);
  };

  const handleDeleteData = async itemId => {
    // Renamed the parameter to "itemId"
    try {
      console.log('Delete CVID: ', cvId);

      await dataService.delete(itemId);
      const updatedData = await dataService.getAll(cvId);
      setSkillsData(updatedData); // Updated to set 'skillsData'
    } catch (error) {
      console.error('There was an error deleting the data', error);
    }
  };
  const [sortByDate, setSortByDate] = useState(true);

  const handleSortChange = () => {
    setSortByDate(!sortByDate);
  };

  return (
    <main>
      <ConfigProvider>
        <UserLayout
          isCollapsed
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
                    <VideoComponent videoUrl="https://fast.wistia.net/embed/iframe/4cr1xxwm8g" />
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
                  <span className="flex block pb-3 text-md font-bold border-b border-gray-300 list-shown-true ">
                    <Space align="center">
                      Your Skills
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
                      skillsData.map(project => (
                        <StandarList
                          key={project.id}
                          data={project}
                          selectedExperience={selectedData}
                          cvId={cvId}
                          onDelete={handleDeleteData}
                          onEdit={handleEditData}
                          title={project.description}
                          subtitle=""
                          updateExperience={updateSkills}
                        />
                      ))}
                  </div>
                </Card>
              </div>
              <div className="flex flex-col px-4">
                <SkillsForm cvId={cvId} onCreated={fetchData} data={selectedData} />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Skill;
