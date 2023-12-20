/* eslint-disable */
'use client';

import HeaderHR from '@/app/components/HeaderHR';
import UserLayout from '@/app/components/Layout/UserLayout';
import CoverLetterCard from '@/app/cover-letter/[id]/finishup/CoverLetterCard';
import CoverLetterCardV2 from '@/app/cover-letter/[id]/finishup/CoverLetterCardV2';
import useStore from '@/store/store';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ViewCoverLetter = ({ params }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    'MANAGE JOBS': true,
  });
  const { avatar, email, userRole } = useStore();
  return (
    <UserLayout
      selected="3"
      isCollapsed={true}
      avatar={avatar}
      email={email}
      userRole={userRole}
      userHeader={
        <>
          <HeaderHR initialEnabledCategories={enabledCategories} />
        </>
      }
      content={
        <div>
          <Link href={'/hr/application'} passHref>
            <button className="mt-16 ml-2">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="ml-2">Back</span>
          </Link>
          <div className="mt-16"></div>
          <CoverLetterCardV2 coverLetterId={params.id} />
        </div>
      }
    />
  );
};
export default ViewCoverLetter;
