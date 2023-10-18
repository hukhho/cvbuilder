'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import UserCoverLetterBuilderHeader from '@/app/components/UserCoverLetterBuilderHeader';

import DataService from '../../../utils/dataService';
import ContactForm from '@/app/components/Form/ContactForm';
import getContact from './contactService';
import CoverLetterForm from '@/app/components/Form/CoverLetterForm';

const Contact = ({ params }) => {
  const [contactData, setContactData] = useState([]); // Renamed to "contactData"
  const [enabledCategories, setEnabledCategories] = useState({
    CONTACT: true,
  });

  const cvId = params.id;

  const fetchData = async () => {
    try {
      const userId = 1;
      const data = await getContact(1);
      console.log('fetchData ', data);
      setContactData(data); // Updated to set "contactData"
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={<UserCoverLetterBuilderHeader />}
          content={
            <div className="flex h-screen ">
              <div className="flex flex-col p-4">
                <CoverLetterForm cvId={cvId} onCreated={fetchData} data={contactData} />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Contact;
