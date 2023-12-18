'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import UserCoverLetterBuilderHeader from '@/app/components/UserCoverLetterBuilderHeader';

import CoverLetterFormV2 from '@/app/components/Form/CoverLetterFormV2';

import { getResumes, getResumesCoverLetter } from '@/app/utils/indexService';
import getCoverLetter from '../finishup/getCoverLetter';
import getContact from '@/app/resume/[id]/contact/contactService';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';

const Contact = ({ params }) => {
  const [contactData, setContactData] = useState([]);
  const [resumeData, setResumeData] = useState();

  const [listResumes, setListResumes] = useState([]);

  const [enabledCategories, setEnabledCategories] = useState({
    CONTACT: true,
  });
  const { avatar, email, userRole } = useStore();

  const cvId = params.id;

  const fetchData = async () => {
    try {
      const data = await getCoverLetter(params.id);

      console.log('fetchData ', data);
      setContactData(data); // Updated to set "contactData"
      if (data?.cvId) {
        const dataResumes = await getContact(data?.cvId);
        setResumeData(dataResumes);
      }
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  const fetchResumes = async () => {
    try {
      const resumesList = await getResumesCoverLetter();
      setListResumes(resumesList);
      console.log('fetchResumes: ', resumesList);
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchResumes();
  }, []);

  return (
    <main>
      <ConfigProvider>
        <UserLayout
          isCollapsed
          avatar={avatar}
          email={email}
          userRole={userRole}
          userHeader={
            <UserCoverLetterBuilderHeader
              coverLetterId={cvId}
              initialEnabledCategories={enabledCategories}
            />
          }
          content={
            <div className="flex h-screen ">
              <div className="flex flex-col p-4 pl-0" style={{ width: '800px' }}>
                <CoverLetterFormV2
                  coverLetterId={params.id}
                  onCreated={fetchData}
                  resumeData={resumeData}
                  listResumes={listResumes}
                  data={contactData}
                />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Contact;
