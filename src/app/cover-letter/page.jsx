'use client';

import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import UserLayout from '../components/Layout/UserLayout';
import UserHeader from '../components/UserHeader';
import CVCard from '../components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation
import { getCoverLetters } from '../utils/indexService';

const CoverLetterIndex = () => {
  const [resumes, setResumes] = useState([]);
  const [mockCards, setMockCards] = useState([]);
  const [enabledCategories, setEnabledCategories] = useState({
    'COVER LETTERS': true,
  });
  // Mock JSON data for cards
  const defaultImageUrl =
    'https://photos.pinksale.finance/file/pinksale-logo-upload/1692701716873-e9b5323edab631aa000eabb7a8512a33.PNG';

  const fetchResumes = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedCoverLetter = await getCoverLetters(1);
      // const similatorFetch =
      // Add additional data to create mock cards

      const mockCardsData = fetchedCoverLetter.map(cover => ({
        cvId: cover.id,
        imageUrl: defaultImageUrl,
        title: `${cover.title}`, // Add cvId to the card title
      }));

      // Update state with fetched resumes and mock cards
      setResumes(fetchedCoverLetter);

      setMockCards(mockCardsData);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <main>
      <ConfigProvider>
        <UserLayout
          userHeader={<UserHeader initialEnabledCategories={enabledCategories} />}
          content={
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Map over the mockCardData and generate cards with links */}
                {mockCards.map((card, index) => (
                  <Link key={index} href={`/cover-letter/${card.cvId}/contact`}>
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

export default CoverLetterIndex;
