'use client';

import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider, Empty } from 'antd';
import UserLayout from '../components/Layout/UserLayout';
import UserHeader from '../components/UserHeader';
import CVCard from '../components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation
import { getCoverLetters, getResumes } from '../utils/indexService';
import CreateCoverLetter from '../components/Modal/CreateCoverLetter';
import Meta from 'antd/es/card/Meta';
import CoverLetterCard from './[id]/finishup/CoverLetterCard';
import CoverLetterCardComponents from './CoverLetterCardComponents';
import useStore from '@/store/store';

const CoverLetterIndex = () => {
  const [resumes, setResumes] = useState([]);
  const enabledCategories = {
    'COVER LETTERS': true,
  };
  const { avatar, email, userRole } = useStore();

  // Mock JSON data for cards
  const defaultImageUrl =
    'https://photos.pinksale.finance/file/pinksale-logo-upload/1692701716873-e9b5323edab631aa000eabb7a8512a33.PNG';

  const fetchResumes = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedCoverLetter = await getCoverLetters();

      setResumes(fetchedCoverLetter);

      console.log('fetchedCoverLetter: ', fetchedCoverLetter);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  const onCreated = () => {
    fetchResumes();
  };

  const [listResumes, setListResumes] = useState([]);

  const fetchData = async () => {
    try {
      const resumesList = await getResumes();
      setListResumes(resumesList);
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  useEffect(() => {
    fetchResumes();
    fetchData();
  }, []);

  return (
    <main>
      <ConfigProvider>
        <UserLayout
          isCollapsed={false}
          avatar={avatar}
          email={email}
          userRole={userRole}
          userHeader={<UserHeader initialEnabledCategories={enabledCategories} />}
          content={
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-4 gap-4">
                <CreateCoverLetter onCreated={onCreated} listResumes={listResumes} />

                {/* Map over the mockCardData and generate cards with links */}
                {resumes?.map((card, index) => (
                  <div key={index}>
                    <CoverLetterCardComponents
                      resume={card}
                      onDeleted={onCreated}
                      onCreated={onCreated}
                    />
                  </div>
                ))}
                {resumes?.length === 0 && <Empty />}
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default CoverLetterIndex;
