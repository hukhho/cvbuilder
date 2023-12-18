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
import useStore from '@/store/store';
import useCVBuilderStore from '../../store/useCVBuilderStore';

const Contact = ({ params }) => {
  // const [contactData, setContactData] = useState([]); // Renamed to "contactData"
  const { avatar, email, userRole } = useStore();
  const enabledCategories = { CONTACT: true };

  const fetchData = async () => {
    try {
      const updatedContactData = await getContact(params.id);
      // Update contactData in the store directly
      useCVBuilderStore.setState({ contactData: updatedContactData });
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params.id]); // Ensure that the effect runs when params.id changes

  const contactData = useCVBuilderStore(state => state.contactData); // Get the contactData from the store

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
            <div className="flex ">
              <div className="flex flex-col p-4 pl-0">
                <ContactForm cvId={params.id} onCreated={fetchData} data={contactData} />

              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Contact;
