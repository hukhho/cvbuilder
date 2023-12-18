'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

// import DataService from '../../../utils/dataService';
import ContactForm from '@/app/components/Form/ContactForm';
import getContact from './contactService';
import { notFound } from 'next/navigation';
import { getResume } from '@/app/utils/indexService';
import UserLayout from '@/app/components/Layout/UserLayout';

const Contact = ({ params }) => {
  const [contactData, setContactData] = useState([]); // Renamed to "contactData"
  // const [resume, setResume] = useState();

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
        <UserLayout
          isCollapsed
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex ">
              <div className="flex flex-col p-4 pl-0">
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
