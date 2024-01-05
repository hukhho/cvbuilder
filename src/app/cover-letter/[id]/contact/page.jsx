/* eslint-disable */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConfigProvider } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import UserCoverLetterBuilderHeader from '@/app/components/UserCoverLetterBuilderHeader';

import CoverLetterFormV2 from '@/app/components/Form/CoverLetterFormV2';

import { getJobLists, getResumes, getResumesCoverLetter } from '@/app/utils/indexService';
import getCoverLetter from '../finishup/getCoverLetter';
import getContact from '@/app/resume/[id]/contact/contactService';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';
import { ExportOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';

const Contact = ({ params }) => {
  const [contactData, setContactData] = useState([]);
  const [resumeData, setResumeData] = useState();

  const [listResumes, setListResumes] = useState([]);

  const [enabledCategories, setEnabledCategories] = useState({
    CONTACT: true,
  });
  const { avatar, email, userRole } = useStore();

  const cvId = params.id;
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get('jobId');
  const isApplyProcess = searchParams.get('isApplyProcess');

  console.log('jobIdParam: ', jobIdParam);
  console.log('isApplyProcess: ', isApplyProcess);

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

  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    try {
      const data = await getJobLists();
      console.log('data getAllExperiences ', data);

      setExperiences(data);
    } catch (error) {
      console.error('There was an error fetching the experiences', error);
    }
  };
  const handleLabelClick = (e, value) => {
    // Handle the label click to select the option
    e.stopPropagation(); // Prevents the click from reaching the outer div
    // Your logic to handle the label click (e.g., set the selected value)
  };

  const handleLinkClick = (e, link) => {
    // Handle the link click to open the link
    e.stopPropagation(); // Prevents the click from reaching the outer div
    window.open(link, '_blank');
  };
  const options = experiences.map(item => ({
    value: item?.id,
    label: (
      <div className="relative">
        <span style={{ marginRight: '20px' }}>{`${item?.title} at ${item?.companyName}`}</span>
        <a
          className="absolute"
          style={{ right: '8px' }}
          onClick={e => handleLinkClick(e, `/job/${item?.id}`)}
        >
          <ExportOutlined />
        </a>
      </div>
    ),
    title: item?.title,
    description: item?.description,
    company: item?.companyName,
  }));

  // const options = experiences.map(item => ({
  //   value: `${item?.id}`,
  //   label: `${item?.title} at ${item?.companyName}`,
  //   title: item?.title,
  //   description: item?.description,
  //   company: item?.companyName,
  // }));
  useEffect(() => {
    fetchData();
    fetchResumes();
    fetchExperiences();
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
              jobIdParam={jobIdParam || null}
              isApplyProcess={isApplyProcess || false}
              coverLetterTitle={contactData?.title}
              coverLetterId={cvId}
              initialEnabledCategories={enabledCategories}
            />
          }
          content={
            <div className="flex h-screen ">
              <div className="flex flex-col p-4 pl-0" style={{ width: '800px' }}>
                <CoverLetterFormV2
                  coverLetterId={params.id}
                  jobIdParam={jobIdParam || null}
                  isApplyProcess={isApplyProcess || false}
                  onCreated={fetchData}
                  resumeData={resumeData}
                  listResumes={listResumes}
                  data={contactData}
                  options={options}
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
