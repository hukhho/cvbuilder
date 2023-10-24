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
import CoverLetterContent from '@/app/components/Form/CoverLetterContent';

const Content = ({ params }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    CONTENT: true,
  });
  const [contentData, setContentData] = useState();

  const cvId = params.id;

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCoverLetterBuilderHeader
              coverLetterId={cvId}
              initialEnabledCategories={enabledCategories}
            />
          }
          content={
            <div className="flex h-screen">
              <div className="flex flex-col p-4">
                <CoverLetterContent data={contentData} />
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Content;
