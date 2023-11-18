'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

// import DataService from '../../../utils/dataService';
import ContactForm from '@/app/components/Form/ContactForm';
import getContact from './contactService';

const Contact = ({ params }) => {
  const [contactData, setContactData] = useState([]); // Renamed to "contactData"
  const [enabledCategories, setEnabledCategories] = useState({
    CONTACT: true,
  });

  const cvId = params.id;

  const fetchData = async () => {
    try {
      const data = await getContact(cvId);
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
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex h-screen ">
              <div className="flex flex-col p-4">
                <ContactForm cvId={cvId} onCreated={fetchData} data={contactData} />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Contact;
