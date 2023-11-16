'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, notification } from 'antd';
import UserLayout from './components/Layout/UserLayout';
import UserHeader from './components/UserHeader';
import CVCard from './components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation
import { getResumes } from './utils/indexService';
import { RadiusBottomrightOutlined } from '@ant-design/icons';

const mockCardsData = [
  {
    cvId: 1,
    imageUrl: 'https://example.com/image1.jpg',
    title: 'Resume Id 1',
  },
  {
    cvId: 2,
    imageUrl: 'https://example.com/image2.jpg',
    title: 'Resume Id 2',
  },
  {
    cvId: 3,
    imageUrl: 'https://example.com/image3.jpg',
    title: 'Resume Id 3',
  },
  {
    cvId: 4,
    imageUrl: 'https://example.com/image4.jpg',
    title: 'Resume Id 4',
  },
  {
    cvId: 5,
    imageUrl: 'https://example.com/image5.jpg',
    title: 'Resume Id 5',
  },
];

const Home = () => {
  // const [api, contextHolder] = notification.useNotification();
  // const openNotification = placement => {
  //   api.info({
  //     message: `Notification ${placement}`,
  //     description: 'Con Cac',
  //     placement,
  //   });
  // };
  const [resumes, setResumes] = useState([]);
  const [mockCards, setMockCards] = useState([]);
  const [enabledCategories, setEnabledCategories] = useState({
    RESUMES: true,
  });
  // Mock JSON data for cards
  const defaultImageUrl =
    'https://photos.pinksale.finance/file/pinksale-logo-upload/1692701716873-e9b5323edab631aa000eabb7a8512a33.PNG';

  const fetchResumes = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      // Update state with fetched resumes and mock cards
      setResumes([]); // Assuming you don't have actual resume data
      setMockCards(mockCardsData);

      // const fetchedResumes = await getResumes(1);

      // // Add additional data to create mock cards
      // const mockCardsData = fetchedResumes.map(resume => ({
      //   cvId: resume.id,
      //   imageUrl: defaultImageUrl,
      //   title: `Resume Id ${resume.id}`, // Add cvId to the card title
      // }));

      // // Update state with fetched resumes and mock cards
      // setResumes(fetchedResumes);
      // setMockCards(mockCardsData);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <main>
      {/* {contextHolder} */}

      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: '#fbfbfb',
            borderRadius: '2px',
            colorPrimary: 'blue',
          },
        }}
      >
        <UserLayout
          selected="1"
          userHeader={<UserHeader initialEnabledCategories={enabledCategories} />}
          content={
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockCards.map((card, index) => (
                  <Link key={index} href={`/resume/${card.cvId}/contact`}>
                    <CVCard imageUrl={card.imageUrl} title={card.title} />
                  </Link>
                ))}
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Home;
