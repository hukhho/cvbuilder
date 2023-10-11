'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

import DataService from '../../../utils/dataService';
import ContactForm from '@/app/components/Form/ContactForm';
import SummaryForm from '@/app/components/Form/SummaryForm';
import getSummary from './summaryService';

const { Meta } = Card;

const Summary = ({ params }) => {
  const [summaryData, setSummaryData] = useState([]); // Renamed to summaryData
  const [selectedData, setSelectedData] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    SUMMARY: true,
  });
  console.log('Data: ', params);

  const cvId = params.id;
  const dataService = new DataService('certifications', cvId);

  const fetchData = async () => {
    try {
      const data = await getSummary(1, cvId);

      console.log('fetchData ', data);
      console.log('Summary: ', data.summary);
      setSummaryData(data); // Updated to setSummaryData
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
      await dataService.delete(cvId, itemId);
      const updatedData = await dataService.getAll(cvId);
      setSummaryData(updatedData); // Updated to setSummaryData
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
        <UserCVBuilderLayout
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex h-screen ">
              <div className="w-2/3 flex flex-col p-4">
                <SummaryForm cvId={cvId} onCreated={fetchData} data={summaryData} />
              </div>
              <div className="w-1/3" />
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Summary;
