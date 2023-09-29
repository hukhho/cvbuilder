"use client"

import React from 'react';
import { ConfigProvider } from 'antd';
import UserLayout from './components/Layout/UserLayout';
import UserHeader from './components/UserHeader';
import CVCard from './components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation

const Home = () => {
  // Mock JSON data for cards
  const mockCardData = [
    {
      cvId: 8, // Add cvId to each mock data item
      imageUrl: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1692701716873-e9b5323edab631aa000eabb7a8512a33.PNG',
      title: 'Mock Card 1',
    },
    {
      cvId: 8, // Add cvId to each mock data item
      imageUrl: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1692701716873-e9b5323edab631aa000eabb7a8512a33.PNG',
      title: 'Mock Card 2',
    },
    {
      cvId: 8, // Add cvId to each mock data item
      imageUrl: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1692701716873-e9b5323edab631aa000eabb7a8512a33.PNG',
      title: 'Mock Card 3',
    },
    // Add more mock data items as needed
  ];

  return (
    <main>
      <ConfigProvider>
        <UserLayout
          userHeader={<UserHeader />}
          content={
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Map over the mockCardData and generate cards with links */}
                {mockCardData.map((card, index) => (
                  <Link key={index} href={`/resume/${card.cvId}/education`}>
                    
                      <CVCard
                        imageUrl={card.imageUrl}
                        title={card.title}
                      />
                    
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
