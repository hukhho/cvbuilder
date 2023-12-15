/* eslint-disable */
'use client';

import HeaderHR from '@/app/components/HeaderHR';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeaderJob from '@/app/components/UserHeaderJob';
import CoverLetterCard from '@/app/cover-letter/[id]/finishup/CoverLetterCard';
import CoverLetterCardV2 from '@/app/cover-letter/[id]/finishup/CoverLetterCardV2';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ViewCoverLetter = ({ params }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    'MY APPLICATION': true,
  });
  const { avatar, email, userRole } = useStore();

  return (
    <UserLayout
      selected="8"
      isCollapsed={true}
      avatar={avatar}
      email={email}
      userRole={userRole}
      userHeader={<UserHeaderJob initialEnabledCategories={enabledCategories} />}
      content={
        <div>
          <Link  href={'/job/application'} passHref>
            <button className='mt-16 ml-2'>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="ml-2">Back</span>
          </Link>
          <div className='mt-16'>
            
          </div>
          <CoverLetterCardV2 coverLetterId={params.id} />
        </div>
      }
    />
  );
};
export default ViewCoverLetter;
