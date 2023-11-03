'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

import SortCheckbox from './SortCheckbox';
import DataService from '../../../utils/dataService';

import InvolvementForm from '@/app/components/Form/InvolvementForm';
import InvolvementList from './InvolvementList';

const { Meta } = Card;

const Involvement = ({ params }) => {
  const [involvementData, setInvolvementData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    INVOLVEMENT: true,
  });

  const cvId = params.id;
  const dataService = new DataService('involvements', cvId);

  const fetchData = async () => {
    try {
      const fetchedData = await dataService.getAll();
      setInvolvementData(fetchedData);
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditData = item => {
    setSelectedData(item);
  };

  const handleDeleteData = async itemId => {
    try {
      await dataService.delete(itemId);
      const updatedData = await dataService.getAll(cvId);
      setInvolvementData(updatedData);
    } catch (error) {
      console.error('There was an error deleting the data', error);
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
                          Your Involvement
                        </div>
                      </div>
                      {involvementData.map(item => (
                        <InvolvementList
                          key={item.id}
                          data={item}
                          onDelete={handleDeleteData}
                          onEdit={handleEditData}
                        />
                      ))}
                      <div className="w-[266px] pl-[63.27px] pr-[64.73px] pt-[12.86px] pb-[13.19px] bg-indigo-500 rounded-md justify-center items-center inline-flex">
                        <div className="text-center text-white text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
                          Create new involvement
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-4">
                <InvolvementForm cvId={cvId} onCreated={fetchData} data={selectedData} />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Involvement;
